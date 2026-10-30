import {
  solicitud,
  irAPaso,
  actualizarEquipo,
  actualizarPlan,
  actualizarTitular,
  actualizarPago,
  actualizarCuotas,
  guardarPoliza,
  reiniciarSolicitud
} from "./estado.js";

import {
  render,
  renderPlanes
} from "./render.js";

import {
  validarEquipo,
  validarTitular,
  validarPago,
  validarMarca,
  validarModelo,
  validarValor,
  validarAntiguedad,
  validarNombre,
  validarApellido,
  validarDni,
  validarNacimiento,
  validarEmail,
  validarCelular,
  validarTerminos,
  validarTarjeta,
  validarVencimiento,
  validarCvv,
  validarTitularTarjeta,
  sinErrores
} from "./validaciones.js";

import {
  cargarPlanes,
  calcularCuotas
} from "./cotizador.js";

import {
  simularPago,
  generarPoliza
} from "./pago.js";

let planes = [];

const formatoNumeroAR = new Intl.NumberFormat("es-AR");

const validadoresEquipo = {
  marca: validarMarca,
  modelo: validarModelo,
  valor: validarValor
};

const validadoresTitular = {
  nombre: validarNombre,
  apellido: validarApellido,
  dni: validarDni,
  nacimiento: validarNacimiento,
  email: validarEmail,
  celular: validarCelular,
  terminos: validarTerminos
};

const validadoresPago = {
  tarjeta: validarTarjeta,
  vencimiento: validarVencimiento,
  cvv: validarCvv,
  titularTarjeta: validarTitularTarjeta
};

function limpiarNumero(valor) {
  return Number(String(valor).replace(/\D/g, "")) || 0;
}

function formatearDni(valor) {
  const limpio = String(valor ?? "")
    .replace(/\D/g, "")
    .slice(0, 8);

  if (!limpio) {
    return "";
  }

  return limpio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatearVencimiento(valor) {
  const limpio = String(valor ?? "")
    .replace(/\D/g, "")
    .slice(0, 4);

  if (limpio.length <= 2) {
    return limpio;
  }

  return `${limpio.slice(0, 2)}/${limpio.slice(2)}`;
}

function formatearNumeroTarjeta(valor) {
  const limpio = String(valor ?? "")
    .replace(/\D/g, "")
    .slice(0, 16);

  return limpio.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function actualizarContadorTarjeta(valor) {
  const cantidad = String(valor ?? "").replace(/\D/g, "").length;
  const contador = document.querySelector("#tarjeta-contador");

  if (contador) {
    contador.textContent = `${cantidad}/16`;
  }
}

function normalizarCelularAutofill(valor) {
  let limpio = String(valor ?? "").replace(/\D/g, "");

  if (limpio.startsWith("54") && limpio.length === 12) {
    limpio = limpio.slice(2);
  }

  return limpio;
}

function mostrarError(campo, mensaje) {
  const selector = campo === "titular"
    ? "#titular-tarjeta"
    : `#${campo}`;

  const input = document.querySelector(selector);
  const error = document.querySelector(`#${campo === "titular" ? "titular-tarjeta" : campo}-error`);

  if (error) {
    error.textContent = mensaje ?? "";
    error.hidden = !mensaje;
  }

  if (input) {
    const grupo = input.closest(".field");

    if (mensaje) {
      grupo?.setAttribute("data-invalid", "");
      input.setAttribute("aria-invalid", "true");

      if (error?.id) {
        input.setAttribute("aria-describedby", error.id);
      }
    } else {
      grupo?.removeAttribute("data-invalid");
      input.removeAttribute("aria-invalid");

      if (input.getAttribute("aria-describedby") === error?.id) {
        input.removeAttribute("aria-describedby");
      }
    }
  }
}

function mostrarErrorAntiguedad(mensaje) {
  const error = document.querySelector("#antiguedad-error");

  if (error) {
    error.textContent = mensaje ?? "";
    error.hidden = !mensaje;
  }
}

function mostrarErrores(errores) {
  Object.entries(errores).forEach(([campo, error]) => {
    if (campo === "antiguedad") {
      mostrarErrorAntiguedad(error);
    } else {
      mostrarError(campo, error);
    }
  });
}

function enfocarPrimerError(errores) {
  const campo = Object.keys(errores).find((nombre) => errores[nombre]);

  if (!campo) return;

  const selector = campo === "antiguedad"
    ? 'input[name="antiguedad"]'
    : campo === "titular"
      ? "#titular-tarjeta"
      : `#${campo}`;

  document.querySelector(selector)?.focus();
}

function actualizarBotonEquipo() {
  const boton = document.querySelector("#btn-ver-planes");
  if (boton) boton.disabled = !sinErrores(validarEquipo(solicitud.equipo));
}

function actualizarBotonTitular() {
  const boton = document.querySelector("#btn-continuar-pago");
  if (boton) boton.disabled = !sinErrores(validarTitular(solicitud.titular));
}

function guardarEquipoDesdeCampo(elemento) {
  const campo = elemento.name;

  if (!campo || !(campo in solicitud.equipo)) {
    return;
  }

  let valor = elemento.value;

  if (campo === "valor") {
    valor = limpiarNumero(valor);

    elemento.value = valor
      ? formatoNumeroAR.format(valor)
      : "";
  }

  actualizarEquipo(campo, valor);
  actualizarBotonEquipo();
}

function guardarTitularDesdeCampo(elemento) {
  const campo = elemento.name;

  if (!campo || !(campo in solicitud.titular)) {
    return;
  }

  let valor = elemento.type === "checkbox"
    ? elemento.checked
    : elemento.value;

  if (campo === "dni") {
    const limpio = String(elemento.value)
      .replace(/\D/g, "")
      .slice(0, 8);

    elemento.value = formatearDni(limpio);
    valor = limpio;
  }

  actualizarTitular(campo, valor);
}

function sincronizarTitularDesdeFormulario() {
  const campos = [
    "nombre",
    "apellido",
    "dni",
    "nacimiento",
    "email",
    "celular",
    "terminos"
  ];

  campos.forEach((campo) => {
    const elemento = document.querySelector(`#${campo}`);

    if (!elemento) return;

    if (campo === "celular" && elemento.value) {
      const celularNormalizado = normalizarCelularAutofill(elemento.value);

      if (celularNormalizado.length === 10) {
        elemento.value = celularNormalizado;
      }
    }

    guardarTitularDesdeCampo(elemento);
  });

  actualizarBotonTitular();
}

function guardarPagoDesdeCampo(elemento) {
  let campo = elemento.name;

  if (campo === "titularTarjeta") {
    campo = "titular";
  }

  if (!campo || !(campo in solicitud.pago)) {
    return;
  }

  let valor = elemento.value;

  if (campo === "tarjeta") {
    valor = formatearNumeroTarjeta(valor);
    elemento.value = valor;
    actualizarContadorTarjeta(valor);
  }

  if (campo === "vencimiento") {
    valor = formatearVencimiento(valor);
    elemento.value = valor;
  }

  actualizarPago(campo, valor);
}

function irYRender(paso) {
  irAPaso(paso);
  render();
  actualizarBotonEquipo();
  actualizarBotonTitular();
}

function configurarNavegacion() {
  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-action]");

    if (!boton) return;

    const accion = boton.dataset.action;

    if (boton.tagName === "A") {
      evento.preventDefault();
    }

    if (accion === "iniciar") {
      irYRender(1);
    }

    if (accion === "volver") {
      irYRender(Math.max(0, solicitud.paso - 1));
    }

    if (accion === "continuar-plan") {
      irYRender(3);

      setTimeout(() => {
        sincronizarTitularDesdeFormulario();
        observarAutocompletadoTitular();
      }, 100);
    }

    if (accion === "reintentar") {
      irYRender(4);
      document.querySelector("#tarjeta")?.focus();
    }

    if (accion === "cambiar-medio") {
      irYRender(4);
      document.querySelector('input[name="metodo"]')?.focus();
    }

    if (accion === "reiniciar") {
      reiniciarSolicitud();

      const botonPagar = document.querySelector("#btn-pagar");
      if (botonPagar) {
        botonPagar.disabled = false;
        botonPagar.textContent = "Pagar";
      }

      render();
      actualizarBotonEquipo();
      actualizarBotonTitular();
    }
  });
}

function configurarEstadoEquipo() {
  const formulario = document.querySelector("#form-cotizar");

  formulario?.addEventListener("input", (evento) => {
    guardarEquipoDesdeCampo(evento.target);

    const campo = evento.target.name;
    const validador = validadoresEquipo[campo];

    if (validador && evento.target.getAttribute("aria-invalid") === "true") {
      const valor = campo === "valor"
        ? solicitud.equipo.valor
        : evento.target.value;

      mostrarError(campo, validador(valor));
    }
  });

  formulario?.addEventListener("change", (evento) => {
    guardarEquipoDesdeCampo(evento.target);

    if (evento.target.name === "antiguedad") {
      mostrarErrorAntiguedad(
        validarAntiguedad(solicitud.equipo.antiguedad)
      );
    }
  });

  formulario?.addEventListener("focusin", () => {
    sincronizarTitularDesdeFormulario();
  });

  formulario?.addEventListener("focusout", (evento) => {
    const campo = evento.target.name;
    const validador = validadoresEquipo[campo];

    if (!validador) return;

    const valor = campo === "valor"
      ? solicitud.equipo.valor
      : evento.target.value;

    mostrarError(campo, validador(valor));
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errores = validarEquipo(solicitud.equipo);
    mostrarErrores(errores);

    if (!sinErrores(errores)) {
      enfocarPrimerError(errores);
      return;
    }

    const cuotas = calcularCuotas(
      solicitud.equipo.valor,
      solicitud.equipo.antiguedad,
      planes
    );

    actualizarCuotas(cuotas);
    irYRender(2);
  });
}

function configurarPlan() {
  const contenedor = document.querySelector("#planes");

  contenedor?.addEventListener("change", (evento) => {
    const radio = evento.target.closest('input[name="plan"]');

    if (!radio || !radio.checked) return;

    actualizarPlan(radio.value);
    render();
  });
}

function observarAutocompletadoTitular() {
  let intentos = 0;

  const intervalo = setInterval(() => {
    if (solicitud.paso !== 3) {
      clearInterval(intervalo);
      return;
    }

    sincronizarTitularDesdeFormulario();
    intentos += 1;

    if (intentos >= 24) {
      clearInterval(intervalo);
    }
  }, 250);
}

function configurarTitular() {
  const formulario = document.querySelector("#form-datos");

  formulario?.addEventListener("animationstart", (evento) => {
    if (evento.animationName === "autofill-detect") {
      setTimeout(sincronizarTitularDesdeFormulario, 0);
    }
  });

  formulario?.addEventListener("input", (evento) => {
    sincronizarTitularDesdeFormulario();

    const campo = evento.target.name;
    const validador = validadoresTitular[campo];

    if (validador && evento.target.getAttribute("aria-invalid") === "true") {
      mostrarError(campo, validador(
        evento.target.type === "checkbox"
          ? evento.target.checked
          : evento.target.value
      ));
    }
  });

  formulario?.addEventListener("change", (evento) => {
    sincronizarTitularDesdeFormulario();

    if (evento.target.name === "terminos") {
      mostrarError("terminos", validarTerminos(evento.target.checked));
    }
  });

  formulario?.addEventListener("focusout", (evento) => {
    const campo = evento.target.name;
    const validador = validadoresTitular[campo];

    if (!validador || evento.target.type === "checkbox") {
      return;
    }

    mostrarError(campo, validador(evento.target.value));
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    sincronizarTitularDesdeFormulario();

    const errores = validarTitular(solicitud.titular);
    mostrarErrores(errores);

    if (!sinErrores(errores)) {
      enfocarPrimerError(errores);
      return;
    }

    irYRender(4);
  });
}

function configurarPago() {
  const formulario = document.querySelector("#form-pago");
  const botonPagar = document.querySelector("#btn-pagar");

  formulario?.addEventListener("input", (evento) => {
    guardarPagoDesdeCampo(evento.target);

    const campo = evento.target.name;
    const validador = validadoresPago[campo];

    if (validador && evento.target.getAttribute("aria-invalid") === "true") {
      const campoEstado = campo === "titularTarjeta" ? "titular" : campo;
      mostrarError(
        campoEstado,
        validador(solicitud.pago[campoEstado])
      );
    }
  });

  formulario?.addEventListener("change", (evento) => {
    guardarPagoDesdeCampo(evento.target);
  });

  formulario?.addEventListener("focusout", (evento) => {
    const campo = evento.target.name;
    const validador = validadoresPago[campo];

    if (!validador) return;

    const campoEstado = campo === "titularTarjeta" ? "titular" : campo;
    mostrarError(
      campoEstado,
      validador(solicitud.pago[campoEstado])
    );
  });

  actualizarContadorTarjeta(solicitud.pago.tarjeta);

  formulario?.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const errores = validarPago(solicitud.pago);
    mostrarErrores(errores);

    if (!sinErrores(errores)) {
      enfocarPrimerError(errores);
      return;
    }

    botonPagar.disabled = true;
    botonPagar.textContent = "Procesando…";

    const resultado = await simularPago(solicitud.pago.tarjeta);

    if (resultado.ok) {
      const poliza = generarPoliza();
      guardarPoliza(poliza);
      irYRender(5);
      return;
    }

    botonPagar.disabled = false;
    botonPagar.textContent = "Pagar";
    irYRender(6);
  });
}

async function iniciarApp() {
  configurarNavegacion();
  configurarEstadoEquipo();
  configurarPlan();
  configurarTitular();
  configurarPago();

  render();
  actualizarBotonEquipo();
  actualizarBotonTitular();

  try {
    planes = await cargarPlanes();
    renderPlanes(planes);
    render();
  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar los planes. Abrí el proyecto con Live Server.");
  }
}

iniciarApp();

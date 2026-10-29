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
  }

  actualizarEquipo(campo, valor);
  actualizarBotonEquipo();
}

function guardarTitularDesdeCampo(elemento) {
  const campo = elemento.name;

  if (!campo || !(campo in solicitud.titular)) {
    return;
  }

  const valor = elemento.type === "checkbox"
    ? elemento.checked
    : elemento.value;

  actualizarTitular(campo, valor);
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

  actualizarPago(campo, elemento.value);
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

function configurarTitular() {
  const formulario = document.querySelector("#form-datos");

  formulario?.addEventListener("input", (evento) => {
    guardarTitularDesdeCampo(evento.target);

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
    guardarTitularDesdeCampo(evento.target);

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

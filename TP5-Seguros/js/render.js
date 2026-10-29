import { solicitud } from "./estado.js";

const formatoARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

function textoEquipo() {
  const { marca, modelo } = solicitud.equipo;

  if (!marca && !modelo) {
    return "Sin completar";
  }

  return [marca, modelo].filter(Boolean).join(" ");
}

function nombrePlan() {
  const nombres = {
    basico: "Básico",
    plus: "Plus",
    premium: "Premium"
  };

  return nombres[solicitud.plan] ?? "Plus";
}

function cuotaActual() {
  return solicitud.cuotas[solicitud.plan] ?? 0;
}

export function renderPantallas() {
  document.querySelectorAll("[data-paso]").forEach((seccion) => {
    seccion.hidden = Number(seccion.dataset.paso) !== solicitud.paso;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function renderStepper() {
  if (solicitud.paso < 1 || solicitud.paso > 4) {
    return;
  }

  document.querySelectorAll(".stepper").forEach((stepper) => {
    stepper.querySelectorAll("[data-step]").forEach((item) => {
      const numero = Number(item.dataset.step);
      const circulo = item.querySelector("span");

      delete item.dataset.status;

      if (numero < solicitud.paso) {
        item.dataset.status = "complete";
        circulo.textContent = "✓";
      } else if (numero === solicitud.paso) {
        item.dataset.status = "active";
        circulo.textContent = String(numero);
      } else {
        circulo.textContent = String(numero);
      }
    });
  });
}

export function renderCuotas() {
  document.querySelectorAll("[data-cuota]").forEach((elemento) => {
    const plan = elemento.dataset.cuota;
    const cuota = solicitud.cuotas[plan] ?? 0;

    elemento.textContent = cuota
      ? formatoARS.format(cuota)
      : "A calcular";
  });
}

export function renderResumen() {
  const equipo = textoEquipo();
  const valor = solicitud.equipo.valor
    ? formatoARS.format(solicitud.equipo.valor)
    : "Sin completar";
  const plan = nombrePlan();
  const cuota = cuotaActual()
    ? formatoARS.format(cuotaActual())
    : "A calcular";

  document.querySelectorAll('[data-resumen="equipo"]').forEach((elemento) => {
    elemento.textContent = equipo;
  });

  document.querySelectorAll('[data-resumen="valor"]').forEach((elemento) => {
    elemento.textContent = valor;
  });

  document.querySelectorAll('[data-resumen="plan"]').forEach((elemento) => {
    elemento.textContent = plan;
  });

  document.querySelectorAll('[data-resumen="cuota"]').forEach((elemento) => {
    elemento.textContent = cuota;
  });

  document.querySelectorAll('[data-resumen="titular"]').forEach((elemento) => {
    const nombreCompleto = [
      solicitud.titular.nombre,
      solicitud.titular.apellido
    ].filter(Boolean).join(" ");

    elemento.textContent = nombreCompleto || "Sin completar";
  });
}

export function renderFormularios() {
  const equipo = solicitud.equipo;

  const marca = document.querySelector("#marca");
  const modelo = document.querySelector("#modelo");
  const valor = document.querySelector("#valor");

  if (marca) marca.value = equipo.marca;
  if (modelo) modelo.value = equipo.modelo;
  if (valor) {
    valor.value = equipo.valor
      ? new Intl.NumberFormat("es-AR").format(equipo.valor)
      : "";
  }

  document.querySelectorAll('input[name="antiguedad"]').forEach((radio) => {
    radio.checked = radio.value === equipo.antiguedad;
  });

  document.querySelectorAll('input[name="plan"]').forEach((radio) => {
    radio.checked = radio.value === solicitud.plan;
  });

  Object.entries(solicitud.titular).forEach(([campo, dato]) => {
    const input = document.querySelector(`#${campo}`);

    if (!input) return;

    if (input.type === "checkbox") {
      input.checked = Boolean(dato);
    } else {
      input.value = dato;
    }
  });

  document.querySelectorAll('input[name="metodo"]').forEach((radio) => {
    radio.checked = radio.value === solicitud.pago.metodo;
  });

  const pago = {
    tarjeta: "#tarjeta",
    vencimiento: "#vencimiento",
    cvv: "#cvv",
    titular: "#titular-tarjeta"
  };

  Object.entries(pago).forEach(([campo, selector]) => {
    const input = document.querySelector(selector);
    if (input) input.value = solicitud.pago[campo];
  });
}

export function renderExito() {
  const nombre = document.querySelector('[data-exito="nombre"]');
  const email = document.querySelector('[data-exito="email"]');
  const poliza = document.querySelector('[data-exito="poliza"]');

  if (nombre) {
    nombre.textContent = solicitud.titular.nombre || "cliente";
  }

  if (email) {
    email.textContent = solicitud.titular.email || "tu email";
  }

  if (poliza) {
    poliza.textContent = solicitud.poliza || "Pendiente";
  }
}

export function render() {
  renderPantallas();
  renderStepper();
  renderCuotas();
  renderResumen();
  renderFormularios();
  renderExito();
}

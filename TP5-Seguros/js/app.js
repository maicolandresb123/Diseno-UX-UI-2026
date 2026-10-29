import {
  solicitud,
  irAPaso,
  actualizarEquipo,
  actualizarPlan,
  actualizarTitular,
  actualizarPago,
  reiniciarSolicitud
} from "./estado.js";

import { render } from "./render.js";

function limpiarNumero(valor) {
  return Number(String(valor).replace(/\D/g, "")) || 0;
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
}

function configurarNavegacion() {
  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-action]");

    if (!boton) return;

    const accion = boton.dataset.action;

    if (accion === "iniciar") {
      irYRender(1);
    }

    if (accion === "volver") {
      irYRender(Math.max(0, solicitud.paso - 1));
    }

    if (accion === "continuar-plan") {
      irYRender(3);
    }

    if (accion === "reintentar" || accion === "cambiar-medio") {
      irYRender(4);
    }

    if (accion === "reiniciar") {
      reiniciarSolicitud();
      render();
    }
  });
}

function configurarEstadoEquipo() {
  const formulario = document.querySelector("#form-cotizar");

  formulario?.addEventListener("input", (evento) => {
    guardarEquipoDesdeCampo(evento.target);
  });

  formulario?.addEventListener("change", (evento) => {
    guardarEquipoDesdeCampo(evento.target);
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });
}

function configurarPlan() {
  document.querySelectorAll('input[name="plan"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        actualizarPlan(radio.value);
        render();
      }
    });
  });
}

function configurarTitular() {
  const formulario = document.querySelector("#form-datos");

  formulario?.addEventListener("input", (evento) => {
    guardarTitularDesdeCampo(evento.target);
  });

  formulario?.addEventListener("change", (evento) => {
    guardarTitularDesdeCampo(evento.target);
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });
}

function configurarPago() {
  const formulario = document.querySelector("#form-pago");

  formulario?.addEventListener("input", (evento) => {
    guardarPagoDesdeCampo(evento.target);
  });

  formulario?.addEventListener("change", (evento) => {
    guardarPagoDesdeCampo(evento.target);
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });
}

function iniciarApp() {
  configurarNavegacion();
  configurarEstadoEquipo();
  configurarPlan();
  configurarTitular();
  configurarPago();
  render();
}

iniciarApp();

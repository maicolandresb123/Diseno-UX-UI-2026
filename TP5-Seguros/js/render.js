import { solicitud } from "./estado.js";

const formatoARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

const configuracionProducto = {
  celular: {
    nombre: "Celular",
    titulo: "Contanos sobre tu celular",
    subtitulo: "Usamos estos datos para calcular las opciones de cobertura.",
    marcas: ["Samsung", "Apple", "Motorola", "Xiaomi", "Otra"],
    valorLabel: "Valor del equipo",
    valorAyuda: "Entre $100.000 y $2.500.000."
  },
  bicicleta: {
    nombre: "Bicicleta",
    titulo: "Contanos sobre tu bicicleta",
    subtitulo: "Con estos datos calculamos la cobertura para tu bicicleta.",
    marcas: ["Venzo", "Top Mega", "Fire Bird", "Specialized", "Trek", "Otra"],
    valorLabel: "Valor de la bicicleta",
    valorAyuda: "Entre $50.000 y $5.000.000."
  }
};

function configActual() {
  return configuracionProducto[solicitud.producto] ?? configuracionProducto.celular;
}

function textoEquipo() {
  const { marca, modelo, tipo } = solicitud.equipo;

  if (solicitud.producto === "bicicleta") {
    return [marca, tipo].filter(Boolean).join(" ") || "Sin completar";
  }

  return [marca, modelo].filter(Boolean).join(" ") || "Sin completar";
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

export function renderCotizador() {
  const config = configActual();
  const titulo = document.querySelector("#cotizador-titulo");
  const subtitulo = document.querySelector("#cotizador-subtitulo");
  const marca = document.querySelector("#marca");
  const ayudaMarca = document.querySelector("#marca-ayuda");
  const campoModelo = document.querySelector("#campo-modelo");
  const campoTipo = document.querySelector("#campo-tipo-bicicleta");
  const valorLabel = document.querySelector("#valor-label");
  const valorAyuda = document.querySelector("#valor-ayuda");

  if (titulo) titulo.textContent = config.titulo;
  if (subtitulo) subtitulo.textContent = config.subtitulo;

  if (ayudaMarca) {
    ayudaMarca.textContent = solicitud.producto === "bicicleta"
      ? "Seleccioná la marca de la bicicleta."
      : "Seleccioná la marca del equipo.";
  }

  if (marca) {
    const actual = solicitud.equipo.marca;
    marca.innerHTML = [
      '<option value="">Elegí una marca</option>',
      ...config.marcas.map((opcion) => `<option value="${opcion}">${opcion}</option>`)
    ].join("");
    marca.value = actual;
  }

  if (campoModelo) campoModelo.hidden = solicitud.producto === "bicicleta";
  if (campoTipo) campoTipo.hidden = solicitud.producto !== "bicicleta";
  if (valorLabel) valorLabel.textContent = config.valorLabel;
  if (valorAyuda) valorAyuda.textContent = config.valorAyuda;
}

export function renderPlanes(planes) {
  const contenedor = document.querySelector("#planes");

  if (!contenedor) return;

  contenedor.innerHTML = planes.map((plan) => {
    const recomendado = plan.recomendado
      ? '<span class="badge">Recomendado</span>'
      : "";

    const coberturas = plan.coberturas
      .map((cobertura) => `<li>✓ ${cobertura}</li>`)
      .join("");

    const seleccionada = plan.id === solicitud.plan ? "checked" : "";
    const clasesCard = "card h-full p-5";

    return `
      <label class="plan-card">
        <input type="radio" name="plan" value="${plan.id}" ${seleccionada}>
        <div class="${clasesCard}">
          <div class="plan-card__header">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-lg font-bold">${plan.nombre}</h3>
              ${recomendado}
            </div>
            <span class="plan-card__radio" aria-hidden="true"></span>
          </div>
          <p class="mt-3">
            <strong class="text-2xl" data-cuota="${plan.id}">A calcular</strong>
            <span class="text-sm text-[var(--muted)]"> / mes</span>
          </p>
          <ul class="mt-5 space-y-2 text-sm text-[var(--muted)]">
            ${coberturas}
          </ul>
        </div>
      </label>
    `;
  }).join("");
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
  const config = configActual();
  const equipo = textoEquipo();
  const valor = solicitud.equipo.valor
    ? formatoARS.format(solicitud.equipo.valor)
    : "Sin completar";
  const plan = nombrePlan();
  const cuota = cuotaActual()
    ? formatoARS.format(cuotaActual())
    : "A calcular";

  document.querySelectorAll('[data-resumen="seguro"]').forEach((elemento) => {
    elemento.textContent = config.nombre;
  });

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
  const tipo = document.querySelector("#tipo");
  const valor = document.querySelector("#valor");

  if (marca) marca.value = equipo.marca;
  if (modelo) modelo.value = equipo.modelo;
  if (tipo) tipo.value = equipo.tipo;
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
  renderCotizador();
  renderCuotas();
  renderResumen();
  renderFormularios();
  renderExito();
}

const factores = {
  "menos-1": 1,
  "1-2": 1.1,
  "mas-2": 1.25
};

export async function cargarPlanes() {
  const url = new URL("../data/planes.json", import.meta.url);
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los planes");
  }

  return respuesta.json();
}

export function calcularCuota(valor, tasaAnual, antiguedad) {
  const factorAntiguedad = factores[antiguedad];

  if (!factorAntiguedad) {
    return 0;
  }

  return Math.round(
    Number(valor) * Number(tasaAnual) / 12 * factorAntiguedad
  );
}

export function calcularCuotas(valor, antiguedad, planes) {
  return Object.fromEntries(
    planes.map((plan) => [
      plan.id,
      calcularCuota(valor, plan.tasaAnual, antiguedad)
    ])
  );
}

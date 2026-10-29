let contador = 1;

export function simularPago(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const limpio = String(numero).replace(/\s/g, "");

      resolve(
        limpio === "4000000000000002"
          ? { ok: false, motivo: "Tarjeta rechazada" }
          : { ok: true }
      );
    }, 1500);
  });
}

export function generarPoliza() {
  const anio = new Date().getFullYear();
  const numero = String(contador).padStart(6, "0");

  contador += 1;

  return `POL-${anio}-${numero}`;
}

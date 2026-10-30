function vacio(valor) {
  return String(valor ?? "").trim() === "";
}

export function validarMarca(valor) {
  return vacio(valor) ? "Elegí una marca" : null;
}

export function validarModelo(valor) {
  const largo = String(valor ?? "").trim().length;
  return largo < 2 || largo > 40
    ? "Ingresá el modelo del equipo"
    : null;
}

export function validarValor(valor) {
  const numero = Number(valor);

  return !Number.isFinite(numero) || numero < 100000 || numero > 2500000
    ? "El valor debe estar entre $100.000 y $2.500.000"
    : null;
}

export function validarAntiguedad(valor) {
  return vacio(valor) ? "Indicá la antigüedad" : null;
}

export function validarNombre(valor) {
  return String(valor ?? "").trim().length < 2
    ? "Ingresá tu nombre"
    : null;
}

export function validarApellido(valor) {
  return String(valor ?? "").trim().length < 2
    ? "Ingresá tu apellido"
    : null;
}

export function validarDni(valor) {
  return /^\d{7,8}$/.test(String(valor ?? "").trim())
    ? null
    : "El DNI debe tener 7 u 8 números";
}

export function validarNacimiento(valor) {
  const texto = String(valor ?? "").trim();
  const coincidencia = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(texto);

  if (!coincidencia) {
    return "Ingresá una fecha válida";
  }

  const dia = Number(coincidencia[1]);
  const mes = Number(coincidencia[2]);
  const anio = Number(coincidencia[3]);

  const nacimiento = new Date(anio, mes - 1, dia);

  if (
    nacimiento.getFullYear() !== anio ||
    nacimiento.getMonth() !== mes - 1 ||
    nacimiento.getDate() !== dia
  ) {
    return "Ingresá una fecha válida";
  }

  const hoy = new Date();
  const limite = new Date(
    hoy.getFullYear() - 18,
    hoy.getMonth(),
    hoy.getDate()
  );

  return nacimiento <= limite
    ? null
    : "Tenés que ser mayor de edad";
}

export function validarEmail(valor) {
  const email = String(valor ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? null
    : "Ingresá un email válido";
}

export function limpiarCelular(valor) {
  return String(valor ?? "").replace(/[\s-]/g, "");
}

export function validarCelular(valor) {
  const limpio = limpiarCelular(valor);

  if (!/^\d{10}$/.test(limpio) || limpio.startsWith("0") || limpio.startsWith("15")) {
    return "Ej.: 11 5555-1234";
  }

  return null;
}

export function validarTerminos(valor) {
  return valor ? null : "Tenés que aceptar los términos";
}

export function validarTarjeta(valor) {
  const limpio = String(valor ?? "").replace(/\s/g, "");
  return /^\d{16}$/.test(limpio)
    ? null
    : "Número de tarjeta inválido";
}

export function validarVencimiento(valor) {
  const texto = String(valor ?? "").trim();
  const coincidencia = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(texto);

  if (!coincidencia) {
    return "Vencimiento inválido";
  }

  const mes = Number(coincidencia[1]);
  const anio = 2000 + Number(coincidencia[2]);
  const vencimiento = new Date(anio, mes, 0, 23, 59, 59);
  const hoy = new Date();

  return vencimiento >= hoy
    ? null
    : "Vencimiento inválido";
}

export function validarCvv(valor) {
  return /^\d{3}$/.test(String(valor ?? "").trim())
    ? null
    : "CVV inválido";
}

export function validarTitularTarjeta(valor) {
  return vacio(valor)
    ? "Ingresá el nombre del titular"
    : null;
}

export function validarEquipo(equipo) {
  return {
    marca: validarMarca(equipo.marca),
    modelo: validarModelo(equipo.modelo),
    valor: validarValor(equipo.valor),
    antiguedad: validarAntiguedad(equipo.antiguedad)
  };
}

export function validarTitular(titular) {
  return {
    nombre: validarNombre(titular.nombre),
    apellido: validarApellido(titular.apellido),
    dni: validarDni(titular.dni),
    nacimiento: validarNacimiento(titular.nacimiento),
    email: validarEmail(titular.email),
    celular: validarCelular(titular.celular),
    terminos: validarTerminos(titular.terminos)
  };
}

export function validarPago(pago) {
  return {
    tarjeta: validarTarjeta(pago.tarjeta),
    vencimiento: validarVencimiento(pago.vencimiento),
    cvv: validarCvv(pago.cvv),
    titular: validarTitularTarjeta(pago.titular)
  };
}

export function sinErrores(errores) {
  return Object.values(errores).every((error) => error === null);
}

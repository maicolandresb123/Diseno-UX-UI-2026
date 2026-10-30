export const solicitud = {
  paso: 0,
  producto: "celular",

  equipo: {
    marca: "",
    modelo: "",
    tipo: "",
    valor: 0,
    antiguedad: ""
  },

  plan: "plus",

  titular: {
    nombre: "",
    apellido: "",
    dni: "",
    nacimiento: "",
    email: "",
    celular: "",
    terminos: false
  },

  pago: {
    metodo: "credito",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
    titular: ""
  },

  cuotas: {
    basico: 0,
    plus: 0,
    premium: 0
  },

  poliza: null
};

export function irAPaso(paso) {
  solicitud.paso = paso;
}

export function seleccionarProducto(producto) {
  solicitud.producto = producto;

  solicitud.equipo = {
    marca: "",
    modelo: "",
    tipo: "",
    valor: 0,
    antiguedad: ""
  };

  solicitud.plan = "plus";
  solicitud.cuotas = {
    basico: 0,
    plus: 0,
    premium: 0
  };
  solicitud.poliza = null;
}

export function actualizarEquipo(campo, valor) {
  solicitud.equipo[campo] = valor;
}

export function actualizarPlan(plan) {
  solicitud.plan = plan;
}

export function actualizarTitular(campo, valor) {
  solicitud.titular[campo] = valor;
}

export function actualizarPago(campo, valor) {
  solicitud.pago[campo] = valor;
}

export function actualizarCuotas(cuotas) {
  solicitud.cuotas = { ...cuotas };
}

export function guardarPoliza(poliza) {
  solicitud.poliza = poliza;
}

export function reiniciarSolicitud() {
  solicitud.paso = 0;
  solicitud.producto = "celular";

  solicitud.equipo = {
    marca: "",
    modelo: "",
    tipo: "",
    valor: 0,
    antiguedad: ""
  };

  solicitud.plan = "plus";

  solicitud.titular = {
    nombre: "",
    apellido: "",
    dni: "",
    nacimiento: "",
    email: "",
    celular: "",
    terminos: false
  };

  solicitud.pago = {
    metodo: "credito",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
    titular: ""
  };

  solicitud.cuotas = {
    basico: 0,
    plus: 0,
    premium: 0
  };

  solicitud.poliza = null;
}

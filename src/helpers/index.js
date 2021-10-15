let moment = require('moment');

const validarFecha = (fecha) => {
  return fecha ? moment.utc(fecha) : fecha
}

module.exports = { validarFecha };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

IngresoSchema = new Schema({
	ingreso_por: String,
	monto: Number,
	fecha: Date
});

module.exports = mongoose.model('Ingreso', IngresoSchema);

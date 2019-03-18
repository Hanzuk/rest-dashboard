const mongoose = require('mongoose');
const Schema = mongoose.Schema;

GastoSchema = new Schema({
	gasto_por: String,
	monto: Number,
	fecha: Date
});

module.exports = mongoose.model('Gasto', GastoSchema);

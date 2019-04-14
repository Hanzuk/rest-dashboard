const mongoose = require('mongoose')
const Schema = mongoose.Schema

Gastos_PeridoSchema = new Schema({
	amount: Number,
	date: Date
})

module.exports = mongoose.model('Gastos_Periodo', Gastos_PeridoSchema)

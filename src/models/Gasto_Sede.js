const mongoose = require('mongoose')
const Schema = mongoose.Schema

Gastos_SedeSchema = new Schema({
	headquarter: String,
	net_total: Number
})

module.exports = mongoose.model('Gastos_Sede', Gastos_SedeSchema)

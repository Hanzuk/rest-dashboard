const mongoose = require('mongoose')
const Schema = mongoose.Schema

IngresoSchema = new Schema({
	amount: Number,
	date: Date
})

module.exports = mongoose.model('Ingreso', IngresoSchema)

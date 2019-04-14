const mongoose = require('mongoose')
const Schema = mongoose.Schema

GastoSchema = new Schema({
	amount: Number,
	date: Date
})

module.exports = mongoose.model('Gasto', GastoSchema)

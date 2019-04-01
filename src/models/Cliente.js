const mongoose = require('mongoose')
const Schema = mongoose.Schema

ClienteSchema = new Schema({
	headquarter: String,
	net_total: Number
})

module.exports = mongoose.model('Cliente', ClienteSchema)

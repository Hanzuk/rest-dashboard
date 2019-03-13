const mongoose = require('mongoose')
const Schema = mongoose.Schema

IncomeSchema = new Schema({
   type: String,
   date: Date,
   amout: Number
})

module.exports = mongoose.model('Income', IncomeSchema)

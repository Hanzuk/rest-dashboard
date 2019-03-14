const mongoose= require('mongoose')
const Schema = mongoose.Schema

PollSchema = new Schema({
   type: String,
   about: String,
   date: Date,
   quality: String
})

module.exports = mongoose.model('Poll', PollSchema)

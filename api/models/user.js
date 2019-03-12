const mongoose = require('mongoose')
const Schema = mongoose.Schema

UserSchema = new Schema({
   age: Number,
   genre: String,
   date_joined: Date,
   state: Boolean
})

module.exports = mongoose.model('User', UserSchema)

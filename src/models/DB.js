const mongoose = require('mongoose')

class Datebase {
   constructor() {
      this.connect()
   }

   connect() {
      mongoose.connect(
         process.env.URL_DB,
         { useNewUrlParser: true }
      )
      .then(() => console.log('✔ MongoDB Connected...'))
      .catch(err => { console.log(`❌ MongoDB Connection Failed ${err.message}`) })
   }
}

module.exports = new Datebase()

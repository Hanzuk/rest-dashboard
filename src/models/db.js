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
      .then(() => console.log('✔ Conexión exitosa al servidor local de MongoDB'))
      .catch(err => { console.log(`❌ Error de conexion al servidor de MongoDB ${err.message}`) })
   }
}

module.exports = new Datebase()

const express = require('express')
const api = express.Router()

//Import controllers here (routes folder)

api.get('/', async(req, res) => {
   await res.status(200).json({
      Autor: 'Roberto Duarte',
      Contacto: 'robert0d3@outlook.com',
      Version: '1.0.0',
      GitHub: 'https://github.com/Hanzuk/rest-dashboard'
   })
})

module.exports = api

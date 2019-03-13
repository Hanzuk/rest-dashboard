const express = require('express')
// const router = require('./router')
const app = express()
const morgan = require('morgan')

const config = require('./api/config')

const usersRouter = require('./api/routes/usersRoute')
const pollsRouter = require('./api/routes/pollsRouter')
const incomesRouter = require('./api/routes/incomesRouters')

app.use(morgan('dev'))

app.set('port', process.env.PORT)

app.use(express.json())

//CORS
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
   next()
})

//Routes
app.use('/api/users', usersRouter)
app.use('/api/polls', pollsRouter)
app.use('/api/incomes', incomesRouter)

//Manejo de errores
app.use((req, res, next) => {
   const error = new Error('Not found')
   error.status(404)
   next(error)
})

app.use((error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
      error: {
         message: error.message
      }
   })
})

module.exports = app

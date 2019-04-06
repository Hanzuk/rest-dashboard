const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const config = require('./src/config')
const DB = require('./src/models/DB')

app.use(morgan('dev'))

app.use(express.json())

// Headers
app.use(
	helmet({
		noCache: true
	})
)

//CORS
app.use(cors())

//Routes
app.use('/api/ingresos', require('./src/routes/ingresos'))
app.use('/api/gastos', require('./src/routes/gastos'))
app.use('/api/clientes', require('./src/routes/clientes'))
app.use('/api/utilidad', require('./src/routes/utilidades'))

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

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
)

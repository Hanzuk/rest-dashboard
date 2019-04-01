const express = require('express')
// const router = require('./router')
const app = express()
const morgan = require('morgan')

const config = require('./src/config')
const DB = require('./src/models/DB')

app.use(morgan('dev'))

app.use(express.json())

//CORS
app.use((req, res, next) => {
	req.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	next()
})

//Routes
app.use('/api/income', require('./src/routes/ingresos'))
app.use('/api/expenses', require('./src/routes/gastos'))
app.use('/api/customers', require('./src/routes/clientes'))
app.use('/api/utility', require('./src/routes/utility'))

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

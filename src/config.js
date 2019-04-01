process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev') {
	process.env.URL_DB = 'mongodb://127.0.0.1/dashboard_dw'
} else {
	process.env.URL_DB =
		'mongodb+srv://hanzuk:5Cq5uMscJbl3XHvX@proyectosistemasinfo3-vqjmx.mongodb.net/test?retryWrites=true'
}

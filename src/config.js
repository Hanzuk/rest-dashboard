process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev') {
	process.env.URL_DB =
		'mongodb+srv://hanzuk:5Cq5uMscJbl3XHvX@proyectosistemasinfo3-vqjmx.mongodb.net/dashboard_dw?retryWrites=true'
} else {
	process.env.URL_DB =
		'mongodb+srv://hanzuk:5Cq5uMscJbl3XHvX@proyectosistemasinfo3-vqjmx.mongodb.net/dashboard_dw?retryWrites=true'
}

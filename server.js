const app = require('./app')
const db = require('./api/models/db')

app.listen(
   app.get('port')
)

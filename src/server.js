const app = require('./app')
const db = require('./models/db')

app.listen(
   app.get('port')
)

//imports
const express = require('express')
const morgan = require('morgan')
const routes = require('./src/routes/index')

const app = express()

//settings
app.set("port", 3030)

//middlewares
app.use(express.json())
app.use(morgan("dev"))//TODO, DELETED

//routes
//app.use(routes)
require('./src/routes')(app);

app.get('/', async (req, res) => {
  res.send('Back corriendo')
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
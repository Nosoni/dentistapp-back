//imports
const express = require('express')
const morgan = require('morgan')
const routes = require('./src/routes_anterior/index')

const permisosruta = require("./src/routes/permisos")

const app = express()

//settings
app.set("port", 3030)
app.set("llaveSecreta", "pepito");

//middlewares
app.use(express.json())
app.use(morgan("dev"))//TODO, DELETED

//routes
//app.use(routes)
//require('./src/routes_anterior')(app);
require('./src/routes/usuario')(app);
app.use(permisosruta)

app.get('/', async (req, res) => {
  res.send('Back corriendo')
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
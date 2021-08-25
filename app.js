//imports
const express = require('express')
const morgan = require('morgan')
const routes = require('./src/routes_anterior/index')
const privadas = require("./src/routes/index")
const publicas = require('./src/routes/publicas')

const app = express()

//settings
app.set("port", 3030)
app.set("llaveSecreta", "pepito");

//middlewares
app.use(express.json())
app.use(morgan("dev"))//TODO, DELETED

//routes
app.use(publicas)
app.use(privadas)
//require('./src/routes/usuario')(app);

app.get('/', async (req, res) => {
  res.send('Back corriendo')
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
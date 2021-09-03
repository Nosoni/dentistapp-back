//imports
const express = require('express')
const morgan = require('morgan')
const config = require('./src/configuraciones/index')
const definiciones = require('./src/constantes/index')
const privadas = require("./src/routes/index")
const publicas = require('./src/routes/publicas')
const cors = require('cors')
require('dotenv').config()

const app = express()
console.log(config.env);

//settings
app.set(definiciones.puerto, config.port)
app.set(definiciones.llave_secreta, config.llaveSecreta);

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))//TODO, DELETED

//routes
app.use(publicas)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(privadas)

app.listen(process.env.APP_PORT || app.get(definiciones.puerto), () => {
  console.log(`puerto: ${process.env.APP_PORT}${app.get(definiciones.puerto)}`)
})
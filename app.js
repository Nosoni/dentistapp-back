//imports
const express = require('express')
const morgan = require('morgan')
const config = require('./src/configuraciones/index')
const definiciones = require('./src/constantes/index')
const privadas = require("./src/routes/index")
const publicas = require('./src/routes/publicas')
const cors = require('cors')
let jsreport = require('jsreport-core')({
  "extensions": {
    "chrome-pdf": {
      "launchOptions": {
        "args": [
          "--no-sandbox"
        ]
      }
    }
  }
});
jsreport.use(require('jsreport-handlebars')());
jsreport.use(require('jsreport-chrome-pdf')());
jsreport.init();



const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

var admin = require("firebase-admin");
var serviceAccount = require("./src/configuraciones/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storageBucket
});


const app = express()
app.locals.bucket = admin.storage().bucket()
console.log(config.env);

//settings
app.set(definiciones.puerto, config.port)
app.set(definiciones.llave_secreta, config.llaveSecreta);
app.set(definiciones.jsreport, jsreport)

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))//TODO, DELETED

//routes
app.use(publicas)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileName = req.file.originalname
    const file = app.locals.bucket.file(fileName)
    await file.createWriteStream().end(req.file.buffer)
    const url = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(signedUrls => {
      // signedUrls[0] contains the file's public URL
      return signedUrls[0]
    });
    console.log(url)
    res.send(url)
  } catch (error) {
    res.send('error')
  }
})
app.use(privadas)

app.listen(app.get(definiciones.puerto), () => {
  console.log(`puerto: ${app.get(definiciones.puerto)}`)
})
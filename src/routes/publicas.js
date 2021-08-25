const publicas = require("../controller/publicas")
const express = require('express')
const router = express.Router()

router.post(`/login`, publicas.login)

module.exports = router;
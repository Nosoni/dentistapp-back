const express = require("express")
const userRoutes = express.Router();
const controller = require("../controller/permisos")
userRoutes.get('/permisos', controller.list);

module.exports = userRoutes
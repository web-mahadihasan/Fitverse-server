const express = require("express")
const { getAllClass } = require("../Controllers/classController")

const classRoute = express.Router()

classRoute.get("/api/class", getAllClass)

module.exports = classRoute
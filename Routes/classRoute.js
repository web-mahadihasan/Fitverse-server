const express = require("express")
const { getAllClass, AddClass } = require("../Controllers/classController")
const verifyToken = require("../Middleware/verifyToken")
const verifyAdmin = require("../Middleware/verifyAdmin")

const classRoute = express.Router()

classRoute.get("/api/class", getAllClass)
classRoute.post("/api/class/add", verifyToken, verifyAdmin, AddClass)

module.exports = classRoute;
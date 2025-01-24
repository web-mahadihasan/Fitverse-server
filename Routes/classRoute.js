const express = require("express")
const { getAllClass, AddClass, getPaginateClass } = require("../Controllers/classController")
const verifyToken = require("../Middleware/verifyToken")
const verifyAdmin = require("../Middleware/verifyAdmin")

const classRoute = express.Router()

// Public user route 
classRoute.get("/class", getAllClass)
classRoute.get("/allClass", getPaginateClass)

// Admin route 
classRoute.post("/class/add", verifyToken, verifyAdmin, AddClass)

module.exports = classRoute;
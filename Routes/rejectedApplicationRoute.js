const express = require("express")
const verifyToken = require("../Middleware/verifyToken")
const { getRejectedApplication } = require("../Controllers/rejectedApplicationController")

const rejectedApplicationRoute = express.Router()


// get rejected route 

rejectedApplicationRoute.get("/my-rejection/:email", verifyToken, getRejectedApplication)

module.exports = rejectedApplicationRoute
const express = require("express")
const verifyToken = require("../Middleware/verifyToken")
const { postNewForums, getAllforums } = require("../Controllers/forumsController")


const forumsRoute = express.Router()

// For admin and trainer route 
forumsRoute.post("/post-forums", verifyToken, postNewForums)

// For public user route 
forumsRoute.get("/forums", getAllforums)

module.exports = forumsRoute
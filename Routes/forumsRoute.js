const express = require("express")
const verifyToken = require("../Middleware/verifyToken")
const { postNewForums, getAllforums, addNewUpVote, addNewDownVote, getDetailsById } = require("../Controllers/forumsController")


const forumsRoute = express.Router()

// For admin and trainer route 
forumsRoute.post("/post-forums", verifyToken, postNewForums)

// For public user route 
forumsRoute.get("/forums", getAllforums)
// forums details 
forumsRoute.get("/forum-details/:id", getDetailsById)

// For route upvote 
forumsRoute.post("/upvote/:id",verifyToken, addNewUpVote)
forumsRoute.post("/downvote/:id",verifyToken, addNewDownVote)


module.exports = forumsRoute
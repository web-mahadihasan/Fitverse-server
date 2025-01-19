const express = require("express");
const { applyTrainer, getAllApplication, acceptApplication, rejectApplication, getApplicationForUser } = require("../Controllers/applicationController");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");

const applicationRoute = express.Router()

// For Admin 
applicationRoute.post("/apply-trainer", applyTrainer)
applicationRoute.get("/get-application", verifyToken, verifyAdmin, getAllApplication)
applicationRoute.patch("/accept-application/:id", verifyToken, verifyAdmin, acceptApplication)
applicationRoute.patch("/reject-application/:id", rejectApplication)

// For user 
applicationRoute.get("/get-application/:email", verifyToken, getApplicationForUser)

module.exports = applicationRoute;
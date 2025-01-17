const express = require("express");
const { applyTrainer, getAllApplication, acceptApplication } = require("../Controllers/applicationController");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");

const applicationRoute = express.Router()

applicationRoute.post("/apply-trainer", applyTrainer)
applicationRoute.get("/get-application", verifyToken, verifyAdmin, getAllApplication)
applicationRoute.patch("/accept-application/:id", verifyToken, verifyAdmin, acceptApplication)

module.exports = applicationRoute;
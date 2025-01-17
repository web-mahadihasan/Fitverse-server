const express = require("express");
const { applyTrainer } = require("../Controllers/applicationController");
const verifyToken = require("../Middleware/verifyToken");

const applicationRoute = express.Router()

applicationRoute.post("/apply-trainer",verifyToken, applyTrainer)

module.exports = applicationRoute;
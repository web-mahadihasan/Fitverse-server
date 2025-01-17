const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { getAllTrainers } = require("../Controllers/trainerController");

const trainerRoute = express.Router()

trainerRoute.get("/trainers", verifyToken, getAllTrainers)

module.exports = trainerRoute;
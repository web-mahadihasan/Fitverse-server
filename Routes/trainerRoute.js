const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { getAllTrainers, getTrainerByEmail, getTrainerById } = require("../Controllers/trainerController");

const trainerRoute = express.Router()

trainerRoute.get("/trainers", verifyToken, getAllTrainers)
trainerRoute.get("/trainers/:email", verifyToken, getTrainerByEmail)
trainerRoute.get("/trainers/byId/:id", getTrainerById)

module.exports = trainerRoute;
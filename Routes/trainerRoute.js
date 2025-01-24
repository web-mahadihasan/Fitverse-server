const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { getAllTrainers, getTrainerByEmail, getTrainerById } = require("../Controllers/trainerController");

const trainerRoute = express.Router()
// User Route 
trainerRoute.get("/trainers", getAllTrainers)

trainerRoute.get("/trainers/byId/:id", getTrainerById)

// For Trainer Route 
trainerRoute.get("/trainers/:email", verifyToken, getTrainerByEmail)


module.exports = trainerRoute;
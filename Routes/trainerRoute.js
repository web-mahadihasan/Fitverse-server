const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { getAllTrainers, getTrainerByEmail, getTrainerById, removedTrainer } = require("../Controllers/trainerController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const trainerRoute = express.Router()
// User Route 
trainerRoute.get("/trainers", getAllTrainers)

trainerRoute.get("/trainers/byId/:id", getTrainerById)

// For Trainer Route 
trainerRoute.get("/trainers/:email", verifyToken, getTrainerByEmail)

// Adming route for trainer remove
trainerRoute.delete("/removed-trainer/:id", verifyToken, verifyAdmin, removedTrainer)

module.exports = trainerRoute;
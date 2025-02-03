const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { getAllTrainers, getTrainerByEmail, getTrainerById, removedTrainer, allTrainers } = require("../Controllers/trainerController");
const verifyAdmin = require("../Middleware/verifyAdmin");

const trainerRoute = express.Router()
// User Route for get all trainers
trainerRoute.get("/trainers", getAllTrainers)

trainerRoute.get("/trainers/byId/:id", getTrainerById)

// For Trainer Route 
trainerRoute.get("/trainers/:email", verifyToken, getTrainerByEmail)

// Adming route for trainer remove
trainerRoute.delete("/removed-trainer/:id", verifyToken, verifyAdmin, removedTrainer)

//Get all trainers for admin dashbord home
trainerRoute.get("/all-trainer", verifyToken, verifyAdmin, allTrainers)
module.exports = trainerRoute;
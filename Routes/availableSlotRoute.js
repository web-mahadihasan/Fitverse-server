const express = require("express");
const { getAllSlots, addNewSlot, getSlotsByEmail, removedASlot, getSlotById } = require("../Controllers/availableSlotController");

const availableSlotRoute = express.Router()

// user public 
availableSlotRoute.get("/slots", getAllSlots)

// Login user 
availableSlotRoute.get("/slots/id/:id", getSlotById)

// Protedcted trainer 
availableSlotRoute.get("/slots/:email", getSlotsByEmail)

// Protected trainer 
availableSlotRoute.post("/slots/add", addNewSlot)

// Protected trainer 
availableSlotRoute.delete("/slots/removed/:id", removedASlot)

module.exports = availableSlotRoute;
const express = require("express");
const { getAllSlots, addNewSlot, getSlotsByEmail, removedASlot } = require("../Controllers/availableSlotController");

const availableSlotRoute = express.Router()

availableSlotRoute.get("/slots", getAllSlots)
availableSlotRoute.get("/slots/:email", getSlotsByEmail)
availableSlotRoute.post("/slots/add", addNewSlot)

availableSlotRoute.delete("/slots/removed/:id", removedASlot)

module.exports = availableSlotRoute;
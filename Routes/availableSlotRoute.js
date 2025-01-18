const express = require("express");
const { getAllSlots, addNewSlot, getSlotsByEmail } = require("../Controllers/availableSlotController");

const availableSlotRoute = express.Router()

availableSlotRoute.get("/slots", getAllSlots)
availableSlotRoute.get("/slots/:email", getSlotsByEmail)
availableSlotRoute.post("/slots/add", addNewSlot)


module.exports = availableSlotRoute;
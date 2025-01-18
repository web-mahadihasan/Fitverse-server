const express = require("express");
const { getAllSlots, addNewSlot } = require("../Controllers/availableSlotController");

const availableSlotRoute = express.Router()

availableSlotRoute.get("/slots", getAllSlots)
availableSlotRoute.post("/slots/add", addNewSlot)


module.exports = availableSlotRoute;
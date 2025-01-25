const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { addReview, getAllReview } = require("../Controllers/reviewController");

const reviewRoute = express.Router()

// For user give reveiw 
reviewRoute.post("/add-review", verifyToken, addReview)


// For public 
reviewRoute.get("/all-review", getAllReview)

module.exports = reviewRoute;
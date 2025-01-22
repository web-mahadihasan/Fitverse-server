const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { getAllNewsLetterSubscriber, addNewsLetter } = require("../Controllers/newLetterSubscriptionController");

const newsLetterSubscriptionRoute = express.Router()

// Admin route 
newsLetterSubscriptionRoute.get("/all-subscription-user", verifyToken, verifyAdmin, getAllNewsLetterSubscriber)

// User route 
newsLetterSubscriptionRoute.post("/subscribed", addNewsLetter)

module.exports = newsLetterSubscriptionRoute;
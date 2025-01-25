const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { getAllNewsLetterSubscriber, addNewsLetter } = require("../Controllers/newsLetterSubscriptionController");

const newsletterRoute = express.Router()

// Admin route 
newsletterRoute.get("/all-subscription-user", verifyToken, verifyAdmin, getAllNewsLetterSubscriber)

// User route 
newsletterRoute.post("/subscribed", addNewsLetter)

module.exports = newsletterRoute;
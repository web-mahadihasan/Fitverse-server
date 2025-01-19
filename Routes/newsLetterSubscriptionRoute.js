const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");
const { getAllNewsLetterSubscriber } = require("../Controllers/newLetterSubscriptionController");

const newsLetterSubscriptionRoute = express.Router()

newsLetterSubscriptionRoute.get("/all-subscription-user", verifyToken, verifyAdmin, getAllNewsLetterSubscriber)

module.exports = newsLetterSubscriptionRoute;
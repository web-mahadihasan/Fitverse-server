const express = require("express")

const paymentRoute = express.Router()

paymentRoute.post("/new-payment", addPayment)

module.exports ={paymentRoute}
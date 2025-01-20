const express = require("express")
const { addNewPayment } = require("../Controllers/paymentsController")

const paymentRoute = express.Router()

// user route 
paymentRoute.post("/new-payment", addNewPayment)

module.exports ={paymentRoute}
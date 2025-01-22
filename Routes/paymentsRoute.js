const express = require("express")
const { addNewPayment, getMyPayment } = require("../Controllers/paymentsController")
const verifyToken = require("../Middleware/verifyToken")

const paymentRoute = express.Router()

// user route 
paymentRoute.post("/new-payment",verifyToken, addNewPayment)

// User route get payment history by email 
paymentRoute.get("/my-payment/:email", verifyToken, getMyPayment)

module.exports ={paymentRoute}
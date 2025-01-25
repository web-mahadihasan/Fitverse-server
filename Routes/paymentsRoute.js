const express = require("express")
const { addNewPayment, getMyPayment, getMyClassMember, allPayments } = require("../Controllers/paymentsController")
const verifyToken = require("../Middleware/verifyToken")
const verifyTrainer = require("../Middleware/verifyTrainer")
const verifyAdmin = require("../Middleware/verifyAdmin")

const paymentRoute = express.Router()

// user route 
paymentRoute.post("/new-payment",verifyToken, addNewPayment)

// User route get payment history by email 
paymentRoute.get("/my-payment/:email", verifyToken, getMyPayment)

// trainer slot purchase details 
paymentRoute.get("/my-class-member/:id", verifyToken, verifyTrainer, getMyClassMember)

// Admin Route for get all payments 
paymentRoute.get("/all-payments", verifyToken, verifyAdmin, allPayments)

module.exports ={paymentRoute}
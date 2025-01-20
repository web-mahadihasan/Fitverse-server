const { client } = require("../config/database");


const paymentCollection = client.db("Fitverse").collection("Payments_Collection")

// for user 
const addNewPayment = async (req, res) => {
    const payment = req.body;
    const result = await paymentCollection.insertOne(payment)
    res.send(result)
}

module.exports = {addNewPayment}
const { client } = require("../config/database");
const { classCollection } = require("./classController");


const paymentCollection = client.db("Fitverse").collection("Payments_Collection")

// for user 
const addNewPayment = async (req, res) => {
    const payment = req.body;
    
    const className = payment.selectedClass
    const findClass = await classCollection.findOne({title: className})
    const bookCount = {
        $inc: {
          total_booked: 1, 
        },
      };
    const result = await paymentCollection.insertOne(payment)
    const updateBook = await classCollection.updateOne(findClass, bookCount)
    res.send(result)
}

module.exports = {addNewPayment}
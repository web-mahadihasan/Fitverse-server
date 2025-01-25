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

// For use Payment history 
const getMyPayment = async(req, res) => {
  const email = req.params.email;
  const query = {userEmail: email}

  const result = await paymentCollection.find(query).sort({paymentDate: -1}).toArray()
  res.send(result)
}


// Trainer class member 
const getMyClassMember = async (req, res) => {
  const id = req.params.id; 

  const query = {slotId: id}
  const result = await paymentCollection.find(query).toArray()
  res.send(result)
}


// For adming payment history

const allPayments = async (req, res) => {
  const page = req.query.page;

  if(!page){
    const result = await paymentCollection.find().toArray()
    return res.send(result)
  } else {
    const pageNo = parseInt(req.query.page) || 1 
    const perPage = 6;

     const allPayment = await paymentCollection.countDocuments()
    const totalPage = Math.ceil(allPayment / perPage)

    const payments = await paymentCollection.find().sort({paymentDate: -1}).skip((pageNo - 1) * perPage).limit(perPage).toArray()
    return  res.send({payments, totalPage, pageNo})
  }
  
}
module.exports = {addNewPayment, getMyPayment, getMyClassMember, allPayments}
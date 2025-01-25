// const { Admin } = require("mongodb");
const { client } = require("../config/database");

const newsLetterSubscriber = client.db("Fitverse").collection("NewsLetterSubscribers_Collection")

// For Admin 
const getAllNewsLetterSubscriber = async(req, res) => {
 const result = await newsLetterSubscriber.find().sort({date: -1}).toArray()
 res.send(result)  
}

// For user 

const addNewsLetter = async (req, res) => {
    const subscribe = req.body
    const result = await newsLetterSubscriber.insertOne(subscribe)
      
    res.send(result)
}

module.exports = {getAllNewsLetterSubscriber, addNewsLetter}

// newsLetterSubscriber.find().forEach((doc) => {
//     const dateObject = new Date(doc.date);
//     newsLetterSubscriber.updateOne({ _id: doc._id }, { $set: { date: dateObject } });
//   });
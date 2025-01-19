const { client } = require("../config/database");

const newsLetterSubscriber = client.db("Fitverse").collection("NewsLetterSubscribers_Collection")

const getAllNewsLetterSubscriber = async(req, res) => {
 const result = await newsLetterSubscriber.find().sort({date: -1}).toArray()
 res.send(result)  
}

module.exports = {getAllNewsLetterSubscriber}
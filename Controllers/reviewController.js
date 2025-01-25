const { client } = require("../config/database");

const reviewCollection = client.db("Fitverse").collection("Review_application")


const addReview = async (req, res) => {
    const review = req.body

    const result = await reviewCollection.insertOne(review)
  
    res.send(result)

}

const getAllReview = async (req, res) => {
    const result = await reviewCollection.find().sort({date: -1}).toArray()
    res.send(result)
}

module.exports = {addReview, getAllReview}


// reviewCollection.find().forEach((doc) => {
//     const dateObject = new Date(doc.date);
//     reviewCollection.updateOne({ _id: doc._id }, { $set: { date: dateObject } });
//   });
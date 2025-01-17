const { client } = require("../config/database");

const applicationCollection = client.db("Fitverse").collection("Trainer_application")

// apply trainer route
const applyTrainer = async(req, res) => {
    const application = req.body
    const result = await applicationCollection.insertOne(application)
    res.send(result)
}
// apply trainer route
const getPending = async(req, res) => {
    const application = req.body
    const result = await applicationCollection.insertOne(application)
    res.send(result)
}

module.exports = {applyTrainer}

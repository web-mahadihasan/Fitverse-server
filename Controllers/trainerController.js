const { client } = require("../config/database");

const trainerCollection = client.db("Fitverse").collection("Trainer_Collection")

const getAllTrainers = async(req, res) => {
    const result = await trainerCollection.find().toArray()
    res.send(result)
}

module.exports = {trainerCollection, getAllTrainers}
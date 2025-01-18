const { ObjectId } = require("mongodb");
const { client } = require("../config/database");

const trainerCollection = client.db("Fitverse").collection("Trainer_Collection")

const getAllTrainers = async(req, res) => {
    const result = await trainerCollection.find().toArray()
    res.send(result)
}
const getTrainerByEmail = async(req, res) => {
    const email = req.params.email;
    const query = {email: email}
    const result = await trainerCollection.findOne(query)
    res.send(result)
}
const getTrainerById = async(req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: id}
    const result = await trainerCollection.findOne(query)
    res.send(result)
}

module.exports = {trainerCollection, getAllTrainers, getTrainerByEmail, getTrainerById}
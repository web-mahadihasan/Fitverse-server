const { ObjectId } = require("mongodb");
const { client } = require("../config/database");

const trainerCollection = client.db("Fitverse").collection("Trainer_Collection")

// Get all trainers public 
const getAllTrainers = async(req, res) => {
    const page = parseInt(req.query.page) || 1 
    const perPage = 6;

    const search = req.query.search ? String(req.query.search).trim() : "";

    const query = {   
        name: {
            $regex: search,
            $options: "i",
        },
    }
    const toalTrainers = await trainerCollection.countDocuments(query)
    const totalPage = Math.ceil(toalTrainers / perPage)

    if(page > totalPage) {
        return res.status(404).json({message: "page not found"})
    }

    const trainers = await trainerCollection.find(query).skip((page - 1) * perPage).limit(perPage).toArray()
    res.send({trainers, totalPage, page})

}

// Pulic user route for getting triner details 
const getTrainerById = async(req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: id}
    const result = await trainerCollection.findOne(query)
    res.send(result)
}

// For Trainers route 
const getTrainerByEmail = async(req, res) => {
    const email = req.params.email;
    const query = {email: email}
    const result = await trainerCollection.findOne(query)
    res.send(result)
}



module.exports = {trainerCollection, getAllTrainers, getTrainerByEmail, getTrainerById}
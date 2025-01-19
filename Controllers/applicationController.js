const { ObjectId } = require("mongodb");
const { client } = require("../config/database");
const { usersCollection } = require("./userController");
const { trainerCollection } = require("./trainerController");

const applicationCollection = client.db("Fitverse").collection("Trainer_application")

// apply trainer route
const applyTrainer = async(req, res) => {
    const application = req.body
    const result = await applicationCollection.insertOne(application)
    res.send(result)
}
// apply trainer route
const getAllApplication = async(req, res) => {

    const result = await applicationCollection.find().sort({ date: -1 }).toArray();
    res.send(result)
}

// Aceept application & update application status 
const acceptApplication = async (req, res) => {
    const id = req.params.id
    const data =  req.body

    const applicationQuery = {_id: new ObjectId(id)}
    // Uppdata application status 
    const updateStatus = {
        $set: {
            trainerStatus: "approved",
        }
    }
    const result = await applicationCollection.updateOne(applicationQuery,updateStatus)
    // updata user role 
    const userQuery = {_id: new ObjectId(data.userId)}
    const updateRoleData = {
        $set: {
            role: "trainer"
        }
    }
    const updateRole = await usersCollection.updateOne(userQuery, updateRoleData)
    // Add trainer in database 
    const trainerData = {
        ...data,
        role: "trainer",
        trainerStatus: "approved",
    }
    const addTrainer = await trainerCollection.insertOne(trainerData)

    res.send(result)
}


module.exports = {applyTrainer, getAllApplication, acceptApplication}

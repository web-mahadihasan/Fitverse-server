const { ObjectId } = require("mongodb");
const { client } = require("../config/database");
const { usersCollection } = require("./userController");
const { trainerCollection } = require("./trainerController");
const { rejectedCollection } = require("./rejectedApplicationController");

const applicationCollection = client.db("Fitverse").collection("Trainer_application")

// apply trainer route
const applyTrainer = async(req, res) => {
    const application = req.body
    const result = await applicationCollection.insertOne(application)

    res.send(result)
}
// Admin route
const getAllApplication = async(req, res) => {

    const result = await applicationCollection.find({ trainerStatus: "pending" }).sort({ date: 1 }).toArray();
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

// Reject application
const rejectApplication = async (req, res) => {
    const id = req.params.id
    const rejectedData = req.body
    const filter = {_id: new ObjectId(id)}
    
    const changeStatus = {
        $set: {
            trainerStatus: "reject",
            note: rejectedData.rejectNote
        }
    }
    const result = await applicationCollection.updateOne(filter, changeStatus)

    const rejectApplication = {
        ...rejectedData,
        trainerStatus: "approved",
    }
 
    const updateReject = await rejectedCollection.insertOne(rejectApplication)
    res.send(result)
}

// Get applicant Details by id 
const getApplicantDetails = async (req, res) => {
    const id = req.params.id;

    const result = await applicationCollection.findOne({_id: new ObjectId(id)})

    res.send(result)
}

// get user application for user route 
const getApplicationForUser = async(req, res) => {
    const email = req.params.email;
    const query = {email: email}

    const result = await applicationCollection.find(query).sort({date: -1}).toArray()
    res.send(result)
}
module.exports = 
    {
        applyTrainer, 
        getAllApplication, 
        acceptApplication, 
        rejectApplication, 
        getApplicationForUser, 
        getApplicantDetails,
        getApplicantDetails
    }


    // applicationCollection.find().forEach((doc) => {
    //     const dateObject = new Date(doc.date);
    //     applicationCollection.updateOne({ _id: doc._id }, { $set: { date: dateObject } });
    //   });
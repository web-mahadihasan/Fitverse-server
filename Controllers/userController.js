const { client } = require("../config/database");

const usersCollection = client.db("Fitverse").collection("Users_Collection")

// Get all users 
const getUsers = async(req, res) => {
    const result = await usersCollection.find().toArray()
    res.send(result)
}
// Get user By id 
const getUserById = async(req, res) => {
    const email = req.params.email;
    const query = {email: email}
    const result = await usersCollection.findOne(query)
    res.send(result)
}
// Check is Admin 
const getAdmin = async(req, res) => {
    const email = req.params.email
    const filter = {email: email}
    const user = await usersCollection.findOne(filter)

    let admin = false;
    if(user){
        admin = user?.role === "admin"
    }

    res.send({admin})
}
// Check is Admin 
const getTrainer = async(req, res) => {
    const email = req.params.email
    const filter = {email: email}
    const user = await usersCollection.findOne(filter)

    let trainer = false;
    if(user){
        trainer = user?.role === "trainer"
    }

    res.send({trainer})
}

// Add user database 
const addUser = async(req, res) => {
    const user = req.body;
    const query = {email: user.email}
    const isExist = await usersCollection.findOne(query)
    if(isExist){
        return res.send({message: "User alreay exit is database", insertedId: null})
    }else{
        const result = await usersCollection.insertOne(user);
        res.send(result);
    }
}

// Update role 
const updateRole = async(req, res) => {
    const data = req.body;
    const filter = {userRole: role}

    const updateData = {
        $set: {
            role: data.role
        }
    }
    const result = await usersCollection.updateOne(filter, updateData);
    res.send(result);
}


module.exports = {usersCollection, getUsers, addUser, updateRole, getAdmin, getTrainer, getUserById}
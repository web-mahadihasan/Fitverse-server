const { client } = require("../config/database");


const classCollection = client.db("Fitverse").collection("Class_Collection")

const getAllClass = async (req, res) => {
    const result = await classCollection.find().sort({total_booked: -1}).toArray()
    res.send(result)
}
const AddClass = async (req, res) => {
    const classInfo = req.body;
    const result = await classCollection.insertOne(classInfo)
    res.send(result)
}

module.exports = {classCollection, getAllClass, AddClass}
const { client } = require("../config/database");


const classCollection = client.db("Fitverse").collection("Class_Collection")

const getAllClass = async (req, res) => {
    const result = await classCollection.find().toArray()
    res.send(result)
}

module.exports = {getAllClass}
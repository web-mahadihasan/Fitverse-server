const { ObjectId } = require("mongodb");
const { client } = require("../config/database");

const rejectedCollection = client.db("Fitverse").collection("Rejected_application")

const getRejectedApplication = async (req, res) => {
    const email = req.params.email;

    const result = await rejectedCollection.findOne({email: email})
    res.send(result)
}

module.exports = {rejectedCollection, getRejectedApplication}
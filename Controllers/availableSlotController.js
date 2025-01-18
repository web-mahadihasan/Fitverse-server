const { client } = require("../config/database");


const slotCollection = client.db("Fitverse").collection("Slot_Collection")

const addNewSlot = async (req, res) => {
    const slot = req.body
    const result = await slotCollection.insertOne(slot)
    res.send(result)
}

const getAllSlots = async (req, res) => {
    const result = await slotCollection.find().toArray()
    res.send(result)
}
module.exports = {addNewSlot, getAllSlots}
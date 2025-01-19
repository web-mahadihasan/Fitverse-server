const { ObjectId } = require("mongodb");
const { client } = require("../config/database");
const { trainerCollection } = require("./trainerController");


const slotCollection = client.db("Fitverse").collection("Slot_Collection")

// Get all Slot 
const addNewSlot = async (req, res) => {
    const slot = req.body
    const result = await slotCollection.insertOne(slot)

    const id = slot.trainerId
    const filter = {_id: id}
    const trainer = await trainerCollection.findOne(filter);

    const totalHours = parseInt(trainer.totalHours) || 0;
    const updateHours = totalHours - parseInt(slot.classHour)

    const updateTime = {
        $set: {
            totalHours: updateHours,
        }
    }
    const updatedTime = await trainerCollection.updateOne(filter, updateTime)

    res.send(result)
}

// Get slot by email 
const getSlotsByEmail = async (req, res) => {
    const email = req.params.email
    const query = {email: email}
    const result = await slotCollection.find(query).toArray()
    res.send(result)
}

const getAllSlots = async (req, res) => {
    const result = await slotCollection.find().toArray()
    res.send(result)
}
module.exports = {addNewSlot, getAllSlots, getSlotsByEmail}
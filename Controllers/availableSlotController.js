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

// Get slot for card images these will be public
const getAllSlots = async (req, res) => {
    const result = await slotCollection.find().toArray()
    res.send(result)
}


// Remove slot and update trainer time again. these will be trainer verify route 
const removedASlot = async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}

    const slot = await slotCollection.findOne(filter)

    const classDuration = parseInt(slot.classHour) || 0

    // For trainer total hour add 
    const trainerQuery = slot.trainerId
    const trainerFilter = {_id: trainerQuery}
    const trainerData = await trainerCollection.findOne(trainerFilter)
    const newHour = trainerData.totalHours + classDuration
    const addedHour = {
        $set: {
            totalHours: newHour
        }
    }
    const updateHours = await trainerCollection.updateOne(trainerFilter, addedHour)

    // Delete slot 
    const result = await slotCollection.deleteOne(filter)
    res.send(result)
}

module.exports = {addNewSlot, getAllSlots, getSlotsByEmail, removedASlot}
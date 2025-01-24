const { client } = require("../config/database");


const classCollection = client.db("Fitverse").collection("Class_Collection")

const getAllClass = async (req, res) => {
    
    const result = await classCollection.find().sort({total_booked: -1}).toArray()
    res.send(result)
}

const getPaginateClass = async (req, res) => {
    const page = parseInt(req.query.page) || 1 
    const perPage = 6;

    // Search control 
    const search = req.query.search ? String(req.query.search).trim() : "";

    const query = {   
        title: {
            $regex: search,
            $options: "i",
        },
    }
    const sorting = req.query.sort
    let options = {}
    if(sorting === "asc" || sorting === "dsc"){
        options = {sort: {total_booked: sorting === 'asc' ? 1 : -1}}
    }

    const totalClass = await classCollection.countDocuments(query, options);
    const totalPage = Math.ceil(totalClass / perPage)
    if(page > totalPage) {
        return res.status(404).json({message: "page not found"})
    }
    // Sorting control 
    
    
    const allClasses = await classCollection.find(query, options).skip((page - 1) * perPage).limit(perPage).toArray()

    res.send({allClasses, totalPage, page})
}

// Admin route 
const AddClass = async (req, res) => {
    const classInfo = req.body;
    const result = await classCollection.insertOne(classInfo)
    res.send(result)
}

module.exports = {classCollection, getAllClass, AddClass, getPaginateClass}
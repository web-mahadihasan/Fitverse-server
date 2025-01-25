const { client } = require("../config/database");


const forumsCollection = client.db("Fitverse").collection("Forums_Collection")


const postNewForums = async(req, res) => {
    const forum = req.body
    const result = await forumsCollection.insertOne(forum)
       forumsCollection.find().forEach((doc) => {
        const dateObject = new Date(doc.date);
        forumsCollection.updateOne({ _id: doc._id }, { $set: { date: dateObject } });
      });
    res.send(result)
}

// For public user route 
const getAllforums = async (req, res) => {
    const page = req.query.page;

    const perPage = 6;
    const totalBlogs = await forumsCollection.countDocuments()

    const totalPage = Math.ceil(totalBlogs / perPage)
    
    const blogs = await forumsCollection.find().sort({postedDate: -1}).skip((page - 1) * perPage).limit(perPage).toArray()
    res.send({blogs, totalPage, page})
}

module.exports = {postNewForums, getAllforums}
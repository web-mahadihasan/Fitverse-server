const { ObjectId } = require("mongodb");
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

// For public user get form details 
const getDetailsById = async (req, res) => {
  const id = req.params.id
  const result = await forumsCollection.findOne({ _id: new ObjectId(id) });
  res.send(result)
}

// control upvote 
const addNewUpVote = async (req, res) => {
  const id = req.params.id;
  const document = await forumsCollection.findOne({_id: new ObjectId(id)})
  const {userId} = req.body
  // Check alredy downvote or not 
  const downvoteUser = document.downvoteUser
  const isDownvote = downvoteUser.find(voted => voted === userId)

  if(isDownvote){
    const result = await forumsCollection.updateOne({_id: new ObjectId(id)}, { 
      $pull: { downvoteUser: userId },
      $inc: {downvote: -1, upvote: 1 },
      $push: { upvoteUser: userId },
    })
    return res.send(result)
   
  }else{ 
    const result = await forumsCollection.updateOne({_id: new ObjectId(id)},{ 
      $inc: {upvote:  1 },
      $push: { upvoteUser: userId },
    })
    return res.send(result)
  }
}

const addNewDownVote = async (req, res) => {
  const id = req.params.id;
  const document = await forumsCollection.findOne({_id: new ObjectId(id)})
  const {userId} = req.body
  // Check alredy downvote or not 
  const upvoteUser = document.upvoteUser
  const isUpvoted = upvoteUser.find(voted => voted === userId)

  if(isUpvoted){
    const result = await forumsCollection.updateOne({_id: new ObjectId(id)}, { 
      $pull: { upvoteUser: userId },
      $inc: {upvote: -1 ,downvote: 1 },
      $push: { downvoteUser: userId },
    })
    return res.send(result) 
  }else{ 
    const result = await forumsCollection.updateOne({_id: new ObjectId(id)},{ 
      $inc: {downvote:  1 },
      $push: { downvoteUser: userId },
    })
    return res.send(result)
  }

}

module.exports = {postNewForums, getAllforums, addNewUpVote, addNewDownVote, getDetailsById}
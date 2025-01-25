require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const connectToDatabase = async () => {
  try {
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("Server not working", error)
  }
}

module.exports = {client, connectToDatabase}
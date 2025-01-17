const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require("./config/database");
const usersRoute = require("./Routes/usersRoutes");
const applicationRoute = require("./Routes/applicationRoute");
const classRoute = require("./Routes/classRoute");
const trainerRoute = require("./Routes/trainerRoute");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// Database Connection  
connectToDatabase()


// Connection Enter point 
app.use("/", usersRoute)
app.use("/", applicationRoute)
app.use("/", classRoute)
app.use("/", trainerRoute)


// Jwt Create 
app.post('/jwt', async(req, res)=> {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    res.send({token})
})
// Root Endpoint 
app.get("/", (req, res) => {
    res.send(`Server is running with ${port} Port`)
})

// app listen 
app.listen(port, ()=> {
    console.log("Server is running succesfully")
})

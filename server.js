const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require("./config/database");
const usersRoute = require("./Routes/usersRoutes");
const applicationRoute = require("./Routes/applicationRoute");
const classRoute = require("./Routes/classRoute");
const trainerRoute = require("./Routes/trainerRoute");
const availableSlotRoute = require("./Routes/availableSlotRoute");
const newsLetterSubscriptionRoute = require("./Routes/NewsLetterSubscriptionRoute");
const { paymentRoute } = require("./Routes/paymentsRoute");
const rejectedApplicationRoute = require("./Routes/rejectedApplicationRoute");
const reviewRoute = require("./Routes/reviewRoute");
const forumsRoute = require("./Routes/forumsRoute");
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SCRET)

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// Database Connection  
connectToDatabase()


// Connection Entry point 
app.use("/", usersRoute)
app.use("/application-api", applicationRoute)
app.use("/class-api", classRoute)
app.use("/trainer-api", trainerRoute)
app.use("/slot-api", availableSlotRoute)
app.use("/newsletter-api", newsLetterSubscriptionRoute)
app.use("/payment-api", paymentRoute)
app.use("/rejected-application-api", rejectedApplicationRoute)
app.use("/review-api", reviewRoute)
app.use("/forum-api", forumsRoute)


// Jwt Create 
app.post('/jwt', async(req, res)=> {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    res.send({token})
})

// Payment 
app.get("/publishable-key", (req, res)=> {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

// client scret 

// automatic_payment_methods: {
        //   enabled: true,
        // },
app.post("/create-payment-intent", async (req, res) => {
  const {ammount} = req.body
  const finalAmmount = parseInt(ammount * 100)
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmmount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        // payment_method_types: ['card']
      })
  
      res.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

// Root Endpoint 
app.get("/", (req, res) => {
    res.send(`Server is running with ${port} Port`)
})

// app listen 
app.listen(port, ()=> {
    console.log("Server is running succesfully")
})

const { usersCollection } = require("../Controllers/userController")

const verifyTrainer = async (req, res, next) => {
    const email = req.decoded.email
    const query = {email: email}

    const user = await usersCollection.findOne(query)
    const isAdmin = user.role === "trainer";

    if(!isAdmin){
        return res.status(403).send({message: "Forbidend access"})
    }
    next()
}

module.exports = verifyTrainer;
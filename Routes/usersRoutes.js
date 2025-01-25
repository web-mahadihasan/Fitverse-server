const express = require("express");
const { getUsers, addUser, updateRole, getUserRole, getTrainer, getAdmin, getUserById, updateProfile } = require("../Controllers/userController");
const verifyToken = require("../Middleware/verifyToken");
const verifyAdmin = require("../Middleware/verifyAdmin");


const usersRoute = express.Router()

// For user Route 
usersRoute.get("/users",verifyToken, getUsers);
usersRoute.get("/users/:email",verifyToken, getUserById);

// For admin route 
usersRoute.get("/users/admin/:email",verifyToken, getAdmin);

// For Trainer Route 
usersRoute.get("/users/trainer/:email",verifyToken, getTrainer);


usersRoute.post("/users", addUser);

usersRoute.patch("/users-update-role", updateRole);


// Update profile Route for user, trainer, admin 
usersRoute.patch("/update-profile/:email", verifyToken, updateProfile)
module.exports = usersRoute;
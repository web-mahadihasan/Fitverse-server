const express = require("express");
const { getUsers, addUser, updateRole, getUserRole, getTrainer, getAdmin } = require("../Controllers/userController");
const verifyToken = require("../Middleware/verifyToken");


const usersRoute = express.Router()

usersRoute.get("/users",verifyToken, getUsers);
usersRoute.get("/users/admin/:email",verifyToken, getAdmin);
usersRoute.get("/users/trainer/:email",verifyToken, getTrainer);
usersRoute.post("/users", addUser);
usersRoute.patch("/users-update-role", updateRole);

module.exports = usersRoute;
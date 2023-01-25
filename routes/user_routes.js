import express, { response } from "express"
import { UserModel } from "../db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
// import asyncHandler from 'express-async-handler'


const router = express.Router()

const registerUser = async (req,res) => {
    try {
    const { name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    // Check if already User
    const userExists = await UserModel.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User exists with that email")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const newUser = await UserModel.create({ name, email, hashedPassword })

    if (newUser){
        res.status(201).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
         })
    }
    }
    catch (err) {
        res.status(400).send ({ error : err.message })
    }
}

const loginUser = async (req,res) => {
    res.send({message: 'Login user'})
}

const getUser = async (req,res) => {
    res.send({message: 'User data'})
}

// Gets all users
// route :"/users",
// type : "GET",
// action : "Retrieves all users",
// returns : "Array of Users"

router.get("/", async (req, res) => {
    res.send(await UserModel.find())
})

// Gets users by ID
// route :"/users/:id",
// type : "GET",
// action : "Retrieves single User with ID of input",
// returns : "Single User"

// router.get("/:id",async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.id)
//         if (user) {
//             res.send(user)
//         } else {
//             res.status(404).send({ error: "User not found" })
//         }}
//         catch (err) {
//             res.status(500).send ({ error : err.message })
//         }
// })

// Create new User
// router.post("/", async (req, res) => {
//         try {
//         const { name, email, password } = req.body
    
//         const newUser = { name, email, password }
    
//         const insertedUser = await UserModel.create(newUser)
//         res.status(201).send(insertedUser)
//         }
//         catch (err) {
//             res.status(500).send ({ error : err.message })
//         }
// })

// Register new user
// route :"/users",
// type : "POST",
// action : "Creates a new User",
// returns : "Created User"

router.post("/", registerUser, async (req, res) => {

})

// Login user
// route :"/users/login",
// type : "POST",
// action : "Authenticates User",
// returns : "JSON Web token"

router.post("/login", loginUser, async (req, res) => {

})

// Retrieve User details
// route :"/users/login",
// type : "GET",
// action : "Retrieve user data",
// returns : "JWT token"

router.get("/me", getUser, async (req, res) => {

})

export default router
import express, { response } from "express"
import { UserModel } from "../db.js"
import bcrypt from 'bcryptjs'
import { createToken, routeGuard } from "../middleware/authMiddleware.js"

const router = express.Router()

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

router.get("/user/:id",async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: "User not found" })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})


// Register new user
// route :"/users",
// type : "POST",
// action : "Creates a new User",
// returns : "Created User"

router.post("/", async (req, res) => {
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
            throw new Error ('Invalid user details')
        }
    
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        // Create User
        const newUser = await UserModel.create({ name, email, password: hashedPassword })
    
        if (newUser){
            res.status(201).send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: createToken(newUser._id)
             })
        }
        }
        catch (err) {
            res.status(400).send ({ error : err.message })
        }
})

// Login user
// route :"/users/login",
// type : "POST",
// action : "Authenticates User",
// returns : "JSON Web token"

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
    
        // Check user exists
        const user = await UserModel.findOne({ email })
        // Compare Hashed passwords
        if (user && (await bcrypt.compare(password, user.password))) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: createToken(user._id)
             })
        } else {
            res.status(400)
            throw new Error ('Invalid user details')
        }}
        catch (err) {
            res.status(400).send ({ error : err.message }) 
        }
})


// Retrieve User details
// route :"/users/:id",
// type : "GET",
// action : "Retrieve user data",
// returns : "User Details"
// access : Private

router.get("/me", routeGuard, async (req,res) => {
    try {
        const {_id, name, email } = await UserModel.findById(req.user.id)
        res.send({
            id: _id,
            name,
            email

        })
    }
    catch (err) {
        res.status(400).send ({ error : err.message })  
    }
})

export default router
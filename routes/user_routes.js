import express from "express"
import { UserModel } from "../db.js"

const router = express.Router()

const registerUser = (req,res) => {
    res.send({message: 'Register user'})
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

router.get("/:id",async (req, res) => {
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
    res.send({message: 'Register user'})
//     try {
//     const { name, email, password } = req.body

//     const newUser = { name, email, password }

//     const insertedUser = await UserModel.create(newUser)
//     res.status(201).send(insertedUser)
//     }
//     catch (err) {
//         res.status(500).send ({ error : err.message })
//     }
})

// Authenticate a user
router.post("/login", async (req, res) => {
    res.send({message: 'Register user'})
//     try {
//     const { name, email, password } = req.body

//     const newUser = { name, email, password }

//     const insertedUser = await UserModel.create(newUser)
//     res.status(201).send(insertedUser)
//     }
//     catch (err) {
//         res.status(500).send ({ error : err.message })
//     }
})
export default router
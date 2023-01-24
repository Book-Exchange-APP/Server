import express from "express"
import { UserModel } from "../db.js"

const router = express.Router()

// Gets all users
router.get("/", async (req, res) => {
    res.send(await UserModel.find())
})

// Gets users by ID
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

// Create new user
router.post("/", async (req, res) => {
    try {
    const { name, email, password } = req.body

    const newUser = { name, email, password }

    const insertedUser = await UserModel.create(newUser)
    res.status(201).send(insertedUser)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})
export default router
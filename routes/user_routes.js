import express from 'express'
import { UserModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await UserModel.find())
})

router.get('/:id',async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: 'User not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

router.post('/', async (req, res) => {
    try {
    // Create new user
    // Destructure req object 
    const { name, email, password, status } = req.body
    // Validate by creating new appointment object from values passed in.
    const newUser = { name, email, password, status }
    // Push newAppointment to Database
    const insertedUser = await UserModel.create(newUser)
    res.status(201).send(insertedUser)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})
export default router
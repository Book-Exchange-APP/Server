import express from 'express'
import { AppointmentModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await AppointmentModel.find().populate([{path : 'inc_book', select: 'title'}, {path : 'out_book', select: 'title'}]))
})

router.post('/', async (req, res) => {
    try {
    // Create new appointment
    // Destructure req object 
    const { name, inc_book, out_book, date, location, status} = req.body
    // Validate by creating new appointment object from values passed in.
    const newAppointment = { name, inc_book, out_book, date, location, status }
    // Push newAppointment to Database
    const insertedAppointment = await AppointmentModel.create(newAppointment)
    res.status(201).send(insertedAppointment)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
    const appointment = await AppointmentModel.findById(req.params.id)
    if (appointment) {
        res.send(appointment)
    } else {
        res.status(404).send({ error: 'Appointment not found' })
    }}
    catch (err) {
        res.status(500).send ({ error : err.message })
    }

})

export default router
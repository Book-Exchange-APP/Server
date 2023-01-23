import express from 'express'
import { AppointmentModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await AppointmentModel.find().populate([{path : 'inc_book'}, {path : 'out_book'}]))
})

router.post('/', async (req, res) => {
    try {
    // Needs to be amended to accept incoming book details and book selected
    const { first_name, last_name, inc_book, out_book, time, date, status } = req.body
   
    const newAppointment = { first_name, last_name, inc_book, out_book, time, date, status }

    const insertedAppointment = await AppointmentModel.create(newAppointment)
    res.status(201).send(insertedAppointment)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
    const appointment = await AppointmentModel.findById(req.params.id).populate([{path : 'inc_book'}, {path : 'out_book'}])
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
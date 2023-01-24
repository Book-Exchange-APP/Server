import express from "express"
import { AppointmentModel, BookModel } from "../db.js"

const router = express.Router()

// Get all appointments
// route :"/appointments",
// type : "GET",
// action : "Retrieves all appointments",
// returns : "Array of appointments"

router.get("/", async (req, res) => {
    res.send(await AppointmentModel.find().populate([{path : "inc_book"}, {path : "out_book"}]))
})

// Create new appointment 
// route :"/appointments",
// type : "POST",
// action : "Creates a new appointment",
// returns : "Created Appointment"

router.post("/", async (req, res) => {
    try {
    let { first_name, last_name, inc_book, out_book, time, date, status } = req.body
    // Take incoming book details and create new Book in db
    const { title, author, condition, location, language, img, genre, description } = req.body.inc_book
    let time_stamp = Date.now()
    const newBook = { title, author, condition, location, language, img, genre, description, time_stamp }
    const insertedBook = await BookModel.create(newBook)
    // Store inc_book id into variable to create appointment
    inc_book = insertedBook._id
    const newAppointment = { first_name, last_name, inc_book , out_book, time, date, status }

    const insertedAppointment = await AppointmentModel.create(newAppointment)
    res.status(201).send(insertedAppointment)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})

// // Get one Appointment by ID
// route :"/appointments/:id",
// type : "GET",
// action : "Retrieves Single appointment",
// returns : "single appointment"

router.get("/:id", async (req, res) => {
    try {
    const appointment = await AppointmentModel.findById(req.params.id).populate([{path : "inc_book"}, {path : "out_book"}])
    if (appointment) {
        res.send(appointment)
    } else {
        res.status(404).send({ error: "Appointment not found" })
    }}
    catch (err) {
        res.status(500).send ({ error : err.message })
    }

})

// Update status of book
// route :"/appointments/:id",
// type : "PUT",
// action : "Update an appointment",
// returns : "Updated Appointment"

router.put("/:id", async (req, res) => {

    const { first_name, last_name, inc_book, out_book, time, date, status } = req.body
    const updatedAppointment = { first_name, last_name, inc_book, out_book, time, date, status }
  
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, updatedAppointment, { returnDocument: "after" })
      if (appointment) {
        res.send(appointment)
      } else {
        res.status(404).send({ error: "Appointment not found" })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
  
  })

// Get All Appointments by status
// route :"/appointments/status/pending",
// type : "GET",
// action : "Retrieves all appointments that have a status 'Pending'",
// returns : "Array of appointments"

router.get("/status/pending", async (req, res) => {
    try {
    const appointment = await AppointmentModel.find({ status: "Pending" }).populate([{path : "inc_book"}, {path : "out_book"}])
    
    if (appointment) {
        res.send(appointment)
    } else {
        res.status(404).send({ error: "No Appointments found" })
    }}
    catch (err) {
        res.status(500).send ({ error : err.message })
    }

})

export default router
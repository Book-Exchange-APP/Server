import express from "express"
import { AppointmentModel, BookModel, BookStatusModel, AppointmentStatusModel } from "../db.js"
import { routeGuard } from "../middleware/authMiddleware.js"
import { MongoClient } from "mongodb"
import mongoose from "mongoose"
import fs from "fs"
import path from "path"

const router = express.Router()

const client = new MongoClient(process.env.ATLAS_DB_URL)
const database = client.db(process.env.DB_NAME)
const bucket = new mongoose.mongo.GridFSBucket(database, { bucketName: 'images' })

// Get all appointments
// route :"/appointments",
// type : "GET",
// action : "Retrieves all appointments",
// returns : "Array of appointments"

router.get("/", async (req, res) => {
    res.send(await AppointmentModel.find().populate([{ path: "inc_book" }, { path: "out_book" }, { path: 'status' }, { path: 'location' }]))
})

// Create new appointment 
// route :"/appointments",
// type : "POST",
// action : "Creates a new appointment",
// returns : "Created Appointment"

router.post("/", async (req, res) => {
    try {
        let { first_name, last_name, inc_book, out_book, time, date, location } = req.body
        // Take incoming book details and create new Book in db
        const { title, author, condition, language, img, genre, description } = req.body.inc_book
        let time_stamp = Date.now()
        const bookStatus = await BookStatusModel.findOne({ name: "Pending" })
        let status = bookStatus._id.toString()
        const newBook = { title, author, condition, location, language, img, genre, description, time_stamp, status }
        const insertedBook = await BookModel.create(newBook)

        // Store inc_book id into variable to create appointment
        inc_book = insertedBook._id
        const appointmentStatus = await AppointmentStatusModel.findOne({ name: "Pending" })
        status = appointmentStatus._id.toString()
        const newAppointment = { first_name, last_name, inc_book, out_book, time, date, location, status }

        const insertedAppointment = await (await AppointmentModel.create(newAppointment)).populate([{ path: "location", select: "location" }, { path: "inc_book", select: "title author" }, { path: "out_book", select: "title author" }])
        res.status(201).send(insertedAppointment)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// // Get one Appointment by ID
// route :"/appointments/:id",
// type : "GET",
// action : "Retrieves Single appointment",
// returns : "single appointment"

router.get("/:id", async (req, res) => {
    try {
        const appointment = await AppointmentModel.findById(req.params.id).populate([{ path: "inc_book" }, { path: "out_book" }, { path: 'status' }, { path: 'location' }])
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

// Update status of book
// route :"/appointments/:id",
// type : "PUT",
// action : "Update an appointment",
// returns : "Updated Appointment"

router.put("/:id", routeGuard, async (req, res) => {
    if (req.user.admin) {

        const { first_name, last_name, inc_book, out_book, time, date, status, location } = req.body
        const updatedAppointment = { first_name, last_name, inc_book, out_book, time, date, status, location }

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
    } else {
        res.status(401).send({ error: "Unauthorised Access" })
    }

})

// Get All Appointments by status
// route :"/appointments/status/pending",
// type : "GET",
// action : "Retrieves all appointments that have a status 'Pending'",
// returns : "Array of appointments"

router.get("/status/pending", async (req, res) => {

    try {
        const appointmentStatus = await AppointmentStatusModel.findOne({ name: "Pending" })
        const statusId = appointmentStatus._id.toString()

        const appointments = await AppointmentModel.find({ status: statusId }).populate([{ path: "inc_book" }, { path: "out_book" }, { path: "location"}])
        if (appointments.length > 0) {
            let response = []
            let numOfAppointments = appointments.length
            for (let i = 0; i < numOfAppointments; i++) {
                let a = { appointment: appointments[i] }
                bucket.openDownloadStream(appointments[i].inc_book.img).
                    pipe(fs.createWriteStream(`./writefiles/inc_file-${i}`)).
                    on('finish', () => {
                        const stream = fs.createReadStream(`./writefiles/inc_file-${i}`)
                        stream.setEncoding('binary')
                        let d = ''
                        stream.on('data', chunk => d += chunk)
                        stream.on('end', () => {
                            a.incPath = Buffer.from(d, 'binary').toString('base64')
                            bucket.openDownloadStream(appointments[i].out_book.img).
                                pipe(fs.createWriteStream(`./writefiles/out_file-${i}`)).
                                on('finish', () => {
                                    const stream = fs.createReadStream(`./writefiles/out_file-${i}`)
                                    stream.setEncoding('binary')
                                    let da = ''
                                    stream.on('data', chunk => da += chunk)
                                    stream.on('end', () => {
                                        a.outPath = Buffer.from(da, 'binary').toString('base64')
                                        response.push(a)
                                        if (response.length === numOfAppointments) {
                                            res.send(response)
                                            // fs.readdir('writefiles', (err, files) => {
                                            //     if (err) throw err
                                            //     for (const file of files) {
                                            //         fs.unlink(path.join('writefiles', file), (err) => {
                                            //             if (err) throw err
                                            //         })
                                            //     }
                                            // })
                                        }
                                    })
                                })
                        })
                    }) 
                } 
            } else {
                        res.status(404).send({ error: "No Appointments found" })
                    }}
        catch (err) {
                res.status(500).send({ error: err.message })
            }
        }
)

export default router
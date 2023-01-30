import express from "express"
import { BookStatusModel, AppointmentStatusModel } from "../db.js"

const router = express.Router()

// route :"/status/books",
// type : "GET",
// action : "Retrieves all book status",
// returns : "Array of Status"

router.get("/books", async (req, res) => {
    res.send(await BookStatusModel.find())
})

// route :"/status/appointments",
// type : "GET",
// action : "Retrieves all appointment status",
// returns : "Array of Status"

router.get("/appointments", async (req, res) => {
    res.send(await AppointmentStatusModel.find())
})

export default router
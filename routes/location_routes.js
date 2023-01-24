import express from "express"
import { LocationModel } from "../db.js"

const router = express.Router()

// route :"/locations",
// type : "GET",
// action : "Retrieves all locations",
// returns : "Array of Locations"

router.get("/", async (req, res) => {
    res.send(await LocationModel.find())
})

export default router
import express from "express"
import { GenreModel } from "../db.js"

const router = express.Router()

// route :"/languages",
// type : "GET",
// action : "Retrieves all languages",
// returns : "Array of Languages"

router.get("/", async (req, res) => {
    res.send(await GenreModel.find())
})

export default router
import express from "express"
import { ConditionModel } from "../db.js"

const router = express.Router()

// route :"/conditions",
// type : "GET",
// action : "Retrieves all conditions",
// returns : "Array of Conditions"

router.get("/", async (req, res) => {
    res.send(await ConditionModel.find())
})

export default router
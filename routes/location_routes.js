import express from 'express'
import { LocationModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await LocationModel.find())
})

export default router
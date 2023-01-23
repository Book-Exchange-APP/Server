import express from 'express'
import { UserModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await UserModel.find())
})

export default router
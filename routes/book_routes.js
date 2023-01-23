import express from 'express'
import { BookModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await BookModel.find())
})

router.get('/:id',async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id)
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: 'Book not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

export default router
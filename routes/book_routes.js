import express from 'express'
import { BookModel } from '../db.js'

const router = express.Router()

// Get All Books ordered by latest arrival
router.get('/', async (req, res) => {
    res.send(await BookModel.find().sort({time_stamp: -1}).populate({ path: 'location'}))
})

// Get book by ID
router.get('/:id',async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id).populate({ path: 'location'})
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: 'Book not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Get Book by Title
router.get('/title/:title',async (req, res) => {
    try {
        const book = await BookModel.findOne({ title: req.params.title }).populate({ path: 'location'})
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: 'Book not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Get All Books by Author
router.get('/author/:author',async (req, res) => {
    try {
        const book = await BookModel.find({ author: req.params.author }).populate({ path: 'location'})
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: 'Book not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Get All Books by Genre
router.get('/genre/:genre',async (req, res) => {
    try {
        const book = await BookModel.find({ genre: req.params.genre }).populate({ path: 'location'})
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: 'Book not found' })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Create new Book
router.post('/', async (req, res) => {
    try {
    // Needs to be amended to accept incoming book details and book selected
    const { title, author, condition, location, language, img, genre, description } = req.body
   
    const newBook = { title, author, condition, location, language, img, genre, description }

    const insertedBook = await BookModel.create(newBook)
    res.status(201).send(insertedBook)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})

export default router
import express from "express"
import { BookModel, BookStatusModel } from "../db.js"
import { routeGuard } from "../middleware/authMiddleware.js"

const router = express.Router()

// Get All Books ordered by latest arrival
// route :"/books",
// type : "GET",
// action : "Retrieves all Books ordered by Latest arrival",
// returns : "Array of books"

router.get("/", async (req, res) => {
    res.send(await BookModel.find().sort({status: 1, time_stamp: -1}).
    populate({path: "condition", select: "name"}).
    populate({path: "language", select: "name"}).
    populate({path: "location", select: "-__v"}).
    populate({path: "status", select: "name"}).
    populate({path: "genre", select: "name"}))
})

// Get book by ID
// route :"/books/:id",
// type : "GET",
// action : "Retrieves single book from ID input",
// returns : "Single book"

router.get("/:id",async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id).
        populate({path: "condition", select: "name"}).
        populate({path: "language", select: "name"}).
        populate({path: "location", select: "-__v"}).
        populate({path: "status", select: "name"}).
        populate({path: "genre", select: "name"})

        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: "Book not found" })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Update status of book
// route :"/books/:id",
// type : "PUT",
// action : "Updates new book in database",
// returns : "Updated book"

router.put("/:id", routeGuard, async (req, res) => {
    if (req.user.admin) {

    const { title, author, condition, location, language, img, genre, description, status } = req.body
    const updatedBook = { title, author, condition, location, language, img, genre, description, status }
  
    try {
      const book = await BookModel.findByIdAndUpdate(req.params.id, updatedBook, { returnDocument: "after" })
      if (book) {
        res.send(book)
      } else {
        res.status(404).send({ error: "Book not found" })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
    } else {
        res.status(401).send({ error: "Unauthorised Access" })
    }
})

// Get Book by Title
// route :"/books/title/:title",
// type : "GET",
// action : "Retrieves all books in database with matching title input",
// returns : "Array of books"

router.get("/title/:title",async (req, res) => {
    try {
        const book = await BookModel.findOne({ title: req.params.title }).
        populate({path: "condition", select: "name"}).
        populate({path: "language", select: "name"}).
        populate({path: "location", select: "-__v"}).
        populate({path: "status", select: "name"}).
        populate({path: "genre", select: "name"})

        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: "Book not found" })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Get All Books by Author
// route :"/books/author/:author",
// type : "GET",
// action : "Retrieves all books in database with matching author input",
// returns : "Array of books"

router.get("/author/:author",async (req, res) => {
    try {
        const book = await BookModel.find({ author: req.params.author }).
        populate({path: "condition", select: "name"}).
        populate({path: "language", select: "name"}).
        populate({path: "location", select: "-__v"}).
        populate({path: "status", select: "name"}).
        populate({path: "genre", select: "name"})

        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: "Book not found" })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Get All Books by Genre
// route :"/books/genre/:genre",
// type : "GET",
// action : "Retrieves all books in database with matching genre input",
// returns : "Array of books"

router.get("/genre/:genre",async (req, res) => {
    try {
        const book = await BookModel.find({ genre: req.params.genre }).
        populate({path: "condition", select: "name"}).
        populate({path: "language", select: "name"}).
        populate({path: "location", select: "-__v"}).
        populate({path: "status", select: "name"}).
        populate({path: "genre", select: "name"})
        
        if (book) {
            res.send(book)
        } else {
            res.status(404).send({ error: "Book not found" })
        }}
        catch (err) {
            res.status(500).send ({ error : err.message })
        }
})

// Create new Book
// route :"/books",
// type : "POST",
// action : "Creates new book in database",
// returns : "Created book"
router.post("/", async (req, res) => {
    try {

    const { title, author, condition, location, language, img, genre, description } = req.body
    let time_stamp = Date.now()

    const bookStatus = await BookStatusModel.findOne({name: "Pending"})
    let status = bookStatus._id.toString()

    const newBook = { title, author, condition, location, language, img, genre, description, time_stamp, status }

    const insertedBook = await BookModel.create(newBook)
    res.status(201).send(insertedBook)
    }
    catch (err) {
        res.status(500).send ({ error : err.message })
    }
})

export default router
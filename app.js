import express from "express"
import appointmentRoutes from "./routes/appointment_routes.js"
import bookRoutes from "./routes/book_routes.js"
import locationRoutes from "./routes/location_routes.js"
import userRoutes from "./routes/user_routes.js"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ 
        info: "Book Exchange API",
        routes: [{
                    route :"/books",
                    type : "GET",
                    action : "Retrieves all Books ordered by Latest arrival",
                    returns : "Array of books"
                },
                {
                    route :"/books",
                    type : "POST",
                    action : "Creates new book in database",
                    returns : "Created book"
                },
                {
                    route :"/books/:id",
                    type : "GET",
                    action : "Retrieves single book from ID input",
                    returns : "Single book"
                },
                {
                    route :"/books/:id",
                    type : "PUT",
                    action : "Updates new book in database",
                    returns : "Updated book"
                },
                {
                    route :"/books/title/:title",
                    type : "GET",
                    action : "Retrieves all books in database with matching title input",
                    returns : "Array of books"
                },
                {
                    route :"/books/author/:author",
                    type : "GET",
                    action : "Retrieves all books in database with matching author input",
                    returns : "Array of books"
                },
                {
                    route :"/books/genre/:genre",
                    type : "GET",
                    action : "Retrieves all books in database with matching genre input",
                    returns : "Array of books"
                },
                {
                    route :"/appointments",
                    type : "GET",
                    action : "Retrieves all appointments",
                    returns : "Array of appointments"
                },
                {
                    route :"/appointments/:id",
                    type : "GET",
                    action : "Retrieves Single appointment",
                    returns : "single appointment"
                },
                {
                    route :"/appointments/status/pending",
                    type : "GET",
                    action : "Retrieves all appointments that have a status 'Pending'",
                    returns : "Array of appointments"
                }

            ]
     })
})

app.use("/books", bookRoutes)

app.use("/appointments", appointmentRoutes)

app.use("/locations", locationRoutes)

app.use("/users", userRoutes)

export default app
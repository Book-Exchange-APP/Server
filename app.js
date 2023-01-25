import express from "express"
import appointmentRoutes from "./routes/appointment_routes.js"
import bookRoutes from "./routes/book_routes.js"
import locationRoutes from "./routes/location_routes.js"
import userRoutes from "./routes/user_routes.js"
import languageRoutes from "./routes/language_routes.js"
import conditionRoutes from "./routes/condition_routes.js"
import genreRoutes from "./routes/genre_routes.js"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ 
        info: "Book Exchange API"
     })
})

app.use("/books", bookRoutes)

app.use("/appointments", appointmentRoutes)

app.use("/locations", locationRoutes)

app.use("/users", userRoutes)

app.use("/languages", languageRoutes)

app.use("/conditions", conditionRoutes)

app.use("/genres", genreRoutes)

export default app
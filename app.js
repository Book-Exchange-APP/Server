import express from "express"
import appointmentRoutes from "./routes/appointment_routes.js"
import bookRoutes from "./routes/book_routes.js"
import locationRoutes from "./routes/location_routes.js"
import userRoutes from "./routes/user_routes.js"
import languageRoutes from "./routes/language_routes.js"
import conditionRoutes from "./routes/condition_routes.js"
import genreRoutes from "./routes/genre_routes.js"
import statusRoutes from "./routes/status_routes.js"
import cors from "cors"
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'


const app = express()

app.use(cors())

app.use(express.json())

const storage = new GridFsStorage({
    url: process.env.ATLAS_DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'images',
            filename: `${Date.now()}-${file.originalname}`
        };
    }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {
    console.log('Uploading')
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log('Upload complete')
        return res.status(200).send(req.file)
    })
})

app.get("/", (req, res) => {
    res.send({
        info: "Book Exchange API"
    })
})

app.get('/tests', (req, res) => {
    res.send(
       
    )
})

app.use("/books", bookRoutes)

app.use("/appointments", appointmentRoutes)

app.use("/locations", locationRoutes)

app.use("/users", userRoutes)

app.use("/languages", languageRoutes)

app.use("/conditions", conditionRoutes)

app.use("/genres", genreRoutes)

app.use("/status", statusRoutes)

export default app
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.set("strictQuery", true)

// Function to close Database connection
async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
}

// Connect to MongoDB via Mongoose
try {
    const m = await mongoose.connect(process.env.ATLAS_DB_URL)
    console.log(m.connection.readyState === 1 ? "Mongoose connected!" : "Mongoose failed to connect")
}
catch (err) {
    console.log(err)
}

let today = new Date().toISOString().slice(0, 10)
let now = Date.now()

// Define Book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 50 },
    author: { type: String, required: true, maxLength: 50 },
    // Add list of set conditions to choose from oneOf?
    condition: { type: String, required: true },
    location: { type: mongoose.ObjectId, ref: "Location", required: true },
    language: { type: String, required: true },
    // change to accept .png files
    img: { type: String, required: true },
    // Add list of set genres to choose from oneOf?
    genre: { type: String, required: true },
    description: { type: String, required: true, maxLength: 100 },
    time_stamp: { type: Number, required: true, default: now },
    status: { type: String, required: true, default: "Pending"}
})

// Create book model based on schema
const BookModel = mongoose.model("Book", bookSchema)

// Define Appointment schema
const appointmentSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 50 },
    last_name: { type: String, required: true, maxLength: 50 },
    inc_book: { type: mongoose.ObjectId, ref: "Book", required: true },
    out_book: { type: mongoose.ObjectId, ref: "Book", required: true },
    // Accepts 24hr time format HH:MM
    time: { type: String, required: true, match: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ },
    // 
    date: { type: Date, required: true, min : today, match: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/ },
    status: { type: String, required: true }
})

// Create appointment model based on schema
const AppointmentModel = mongoose.model("Appointment", appointmentSchema)

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Accespt email type
    email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"] },
    password: { type: String, required: true },
    status: { type: String, required: true, default: 'Public' }
})

// Create User model based on schema
const UserModel = mongoose.model("User", userSchema)

// Define Location schema
const locationSchema = new mongoose.Schema({
    location: { type: String, required: true }, 
    address: { type: String, required: true },
    postcode: { type: Number, required: true },
    phone: { type: Number, required: true }
})

// Create location model based on schema
const LocationModel = mongoose.model("Location", locationSchema)

export { AppointmentModel, BookModel, UserModel, LocationModel, dbClose }
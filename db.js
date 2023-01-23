import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
}

// Connect to MongoDB via Mongoose
try {
    const m = await mongoose.connect(process.env.ATLAS_DB_URL)
    console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect')
}
catch (err) {
    console.log(err)
}
//{ type: mongoose.ObjectID, ref: 'Location'}
// Define Book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    language: { type: String, required: true },
    img: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true, maxLength: 100 }
})

// Create book model based on schema
const BookModel = mongoose.model('Book', bookSchema)

// Define Appointment schema
const appointmentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    //incoming book id
    inc_book: { type: String, required: true },
    //outgoing book id from DB
    out_book: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true }
})

// Create appointment model based on schema
const AppointmentModel = mongoose.model('Appointment', appointmentSchema)

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true }
})

// Create User model based on schema
const UserModel = mongoose.model('User', userSchema)

// Define Location schema
const locationSchema = new mongoose.Schema({
    location: { type: String, required: true }, 
    address: { type: String, required: true },
    postcode: { type: Number, required: true },
    phone: { type: Number, required: true }
})

// Create location model based on schema
const LocationModel = mongoose.model('Location', locationSchema)

export { AppointmentModel, BookModel, UserModel, LocationModel, dbClose }
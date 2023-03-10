import { AppointmentModel, BookModel, LocationModel, UserModel, LanguageModel, ConditionModel, GenreModel, BookStatusModel, AppointmentStatusModel, ImageModel, ImageChunksModel, dbClose } from "./db.js"
import bcrypt from 'bcryptjs'
import mongoose from "mongoose"
import { MongoClient } from "mongodb"
import fs from "fs"

await BookModel.deleteMany()
await LocationModel.deleteMany()
await AppointmentModel.deleteMany()
await UserModel.deleteMany()
await LanguageModel.deleteMany()
await ConditionModel.deleteMany()
await GenreModel.deleteMany()
await BookStatusModel.deleteMany()
await AppointmentStatusModel.deleteMany()
await ImageModel.deleteMany()
await ImageChunksModel.deleteMany()

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash('admin', salt)

const client = new MongoClient(process.env.ATLAS_DB_URL)
const database = client.db(process.env.DB_NAME)
const bucket = new mongoose.mongo.GridFSBucket(database, { bucketName: 'images' })

const imgs = ['the_lord_of_the_rings', 'game_of_thrones', 'winnie_the_pooh', 'matilda', 'bfg', 'war_of_the_worlds', 'dune', 'hp1', 'hp2', 'hp3', 'hp4', 'hp5', 'hp6', 'hp7', 'hp8', 'gardenning']
let imgIds = []
for (let i = 0; i < imgs.length; i++) {
    const stream = fs.createReadStream(`./filestoread/${imgs[i]}.jpeg`)
    const img = stream.
        pipe(bucket.openUploadStream(`${imgs[i]}`))
        imgIds.push(img.id)
}

console.log('Uploaded images')

const languages = [
    { name: "English" },
    { name: "Chinese" },
    { name: "Korean" },
    { name: "French" }
]

const lans = await LanguageModel.insertMany(languages)
console.log("Inserted languages")

const conditions = [
    { name: "Poor" },
    { name: "Good" },
    { name: "Excellent" }
]

const cons = await ConditionModel.insertMany(conditions)
console.log("Inserted conditions")

const genres = [
    { name: "Fantasy" },
    { name: "Children" },
    { name: "Science Fiction" },
    { name: "Gardening"}
]

const gens = await GenreModel.insertMany(genres)
console.log("Inserted genres")

const bookStatus = [
    { name: "Available" },
    { name: "Unavailable" },
    { name: "Pending" },
]

const bss = await BookStatusModel.insertMany(bookStatus)
console.log("Inserted book status")


const appointmentStatus = [
    { name: "Pending" },
    { name: "Approved" },
    { name: "Denied"}
]

const ass = await AppointmentStatusModel.insertMany(appointmentStatus)
console.log("Inserted appointment status")


const locations = [
    {
        location: "Brisbane City",
        address: "5 Queen st, Brisbane City",
        postcode: 4000,
        phone: '0712341234',
        email: 'location1@bx.com'
    },
    {
        location: "South Brisbane",
        address: "10 Watson st, Acacia Ridge",
        postcode: 4110,
        phone: '0743214321',
        email: 'location2@bx.com'
    },
    {
        location: "North Brisbane",
        address: "22 Rainbow st, Sandgate",
        postcode: 4017,
        phone: '1357911132',
        email: 'location3@bx.com'
    }
]

const locs = await LocationModel.insertMany(locations)
console.log("Inserted locations")

const books = [
    {
        title: "Lord Of The Rings",
        author: "J. R. R. Tolkien",
        condition: cons[1],
        location: locs[1],
        language: lans[0],
        img: imgIds[0],
        genre: gens[0],
        description: "One ring to rule them all",
        status: bss[0]
    },
    {
        title: "Game of Thrones",
        author: "George R. R. Martin",
        condition: cons[1],
        location: locs[1],
        language: lans[0],
        img: imgIds[1],
        genre: gens[0],
        description: "Winter is Coming",
        status: bss[2]
    },
    {
        title: "Winnie the Pooh",
        author: "A. A. Milne",
        condition: cons[1],
        location: locs[0],
        language: lans[0],
        img: imgIds[2],
        genre: gens[1],
        description: "Somebody's eaten all the Honey",
        status: bss[0]
    },
    {
        title: "Matilda",
        author: "Roald Dahl",
        condition: cons[1],
        location: locs[0],
        language: lans[0],
        img: imgIds[3],
        genre: gens[1],
        description: "Matilda, Matilda she's really very small. But inside she's TALL",
        status: bss[1]
    },
    {
        title: "BFG",
        author: "Roald Dahl",
        condition: cons[0],
        location: locs[0],
        language: lans[0],
        img: imgIds[4],
        genre: gens[1],
        description: "Big friendly giant befriending a child.",
        status: bss[0]
    },
    {
        title: "War of the Worlds",
        author: "H.G. Wells",
        condition: cons[0],
        location: locs[1],
        language: lans[0],
        img: imgIds[5],
        genre: gens[2],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        condition: cons[0],
        location: locs[1],
        language: lans[0],
        img: imgIds[6],
        genre: gens[2],
        description: "You're a wizard Harry",
        status: bss[1]
    },
    {
        title: "Harry Potter and the Philosophers Stone",
        author: "J.K. Rowling",
        condition: cons[0],
        location: locs[1],
        language: lans[0],
        img: imgIds[7],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        condition: cons[1],
        location: locs[1],
        language: lans[0],
        img: imgIds[8],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[2]
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        condition: cons[2],
        location: locs[1],
        language: lans[0],
        img: imgIds[9],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling",
        condition: cons[0],
        location: locs[2],
        language: lans[0],
        img: imgIds[10],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Harry Potter and the Order of the Phoenix",
        author: "J.K. Rowling",
        condition: cons[2],
        location: locs[1],
        language: lans[0],
        img: imgIds[11],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Gardening for a Lifetime",
        author: "Sydney Eddison",
        condition: cons[2],
        location: locs[1],
        language: lans[0],
        img: imgIds[15],
        genre: gens[3],
        description: "Presents practical advice for older people on ways to maintain gardening activities.",
        status: bss[0]
    },
    {
        title: "Harry Potter and the Half-Blood Prince",
        author: "J.K. Rowling",
        condition: cons[0],
        location: locs[0],
        language: lans[3],
        img: imgIds[12],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[1]
    },
    {
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        condition: cons[0],
        location: locs[1],
        language: lans[2],
        img: imgIds[13],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
    {
        title: "Harry Potter and the Cursed Child",
        author: "J.K. Rowling",
        condition: cons[0],
        location: locs[2],
        language: lans[1],
        img: imgIds[14],
        genre: gens[0],
        description: "You're a wizard Harry",
        status: bss[0]
    },
]

const book = await BookModel.insertMany(books)
console.log("Inserted books")

const appointments = [
    {
        first_name: "Tom",
        last_name: "Cruise",
        inc_book: book[13],
        out_book: book[1],
        time: "13:00",
        date: "12/2/2023",
        status: ass[0],
        location: locs[1]
    },
    {
        first_name: "Robin",
        last_name: "Williams",
        inc_book: book[6],
        out_book: book[8],
        time: "15:30",
        date: "02/25/2023",
        status: ass[0],
        location: locs[1]
    },
    {
        first_name: "Betty",
        last_name: "White",
        inc_book: book[2],
        out_book: book[3],
        time: "18:00",
        date: "04/12/2023",
        status: ass[1],
        location: locs[0]
    }
]

await AppointmentModel.insertMany(appointments)
console.log("Inserted appointments")

const users = [
    {
        name: "Mary Smith",
        email: "admin@bookstore.com",
        password: hashedPassword,
        admin: true
    }
]

await UserModel.insertMany(users)
console.log("Inserted users")


dbClose()
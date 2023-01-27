import { AppointmentModel, BookModel, LocationModel, UserModel, LanguageModel, ConditionModel, GenreModel, dbClose} from "./db.js"
import bcrypt from 'bcryptjs'

await BookModel.deleteMany()
await LocationModel.deleteMany()
await AppointmentModel.deleteMany()
await UserModel.deleteMany()
await LanguageModel.deleteMany()
await ConditionModel.deleteMany()
await GenreModel.deleteMany()

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash('admin', salt)

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
        condition: "Good",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "One ring to rule them all",
        status: "Available"

    },
    {
        title: "Game of Thrones",
        author: "George R. R. Martin",
        condition: "Good",
        location: locs[2],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "Winter is Coming",
        status: "Pending"
    },
    {
        title: "Winnie the Pooh",
        author: "A. A. Milne",
        condition: "Good",
        location: locs[0],
        language: "English",
        img: "IMAGE",
        genre: "Childrens",
        description: "Somebody's eaten all the Honey",
        status: "Available"
    },
    {
        title: "Matilda",
        author: "Roald Dahl",
        condition: "Good",
        location: locs[0],
        language: "English",
        img: "IMAGE",
        genre: "Childrens",
        description: "Matilda, Matilda she's really very small. But inside she's TALL",
        status: "Unavailable"
    },
    {
        title: "BFG",
        author: "Roald Dahl",
        condition: "Poor",
        location: locs[0],
        language: "English",
        img: "IMAGE",
        genre: "Childrens",
        description: "Big friendly giant befriending a child.",
        status: "Available"
    },
    {
        title: "War of the Worlds",
        author: "H.G. Wells",
        condition: "Poor",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Science Fiction",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        condition: "Poor",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Science Fiction",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Philosophers Stone",
        author: "J.K. Rowling",
        condition: "Poor",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        condition: "Good",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        condition: "Excellent",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling",
        condition: "Poor",
        location: locs[2],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Order of the Phoenix",
        author: "J.K. Rowling",
        condition: "Excellent",
        location: locs[1],
        language: "English",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Half-Blood Prince",
        author: "J.K. Rowling",
        condition: "Poor",
        location: locs[0],
        language: "French",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
    {
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        condition: "Poor",
        location: locs[1],
        language: "Korean",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Unavailable"
    },
    {
        title: "Harry Potter and the Cursed Child",
        author: "J.K. Rowling",
        condition: "Poor",
        location: locs[2],
        language: "Chinese",
        img: "IMAGE",
        genre: "Fantasy",
        description: "You're a wizard Harry",
        status: "Available"
    },
]

const book = await BookModel.insertMany(books)
console.log("Inserted books")

const appointments = [
    {
        first_name: "Tom",
        last_name: "Cruise",
        inc_book: book[0],
        out_book: book[1],
        time: "13:00",
        date: "12/2/2023",
        status: "Pending"
    },
    {
        first_name: "Robin",
        last_name: "Williams",
        inc_book: book[6],
        out_book: book[8],
        time: "15:30",
        date: "02/25/2023",
        status: "Pending"
    },
    {
        first_name: "Betty",
        last_name: "White",
        inc_book: book[2],
        out_book: book[3],
        time: "18:00",
        date: "04/12/2023",
        status: "Approved"
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

const languages = [
    { name: "English" },
    { name: "Chinese" },
    { name: "Korean" },
    { name: "French" }
]

await LanguageModel.insertMany(languages)
console.log("Inserted languages")

const conditions = [
    { name: "Poor" },
    { name: "Good" },
    { name: "Excellent" }
]

await ConditionModel.insertMany(conditions)
console.log("Inserted conditions")

const genres = [
    { name: "Fantasy" },
    { name: "Children" },
    { name: "Science Fiction" }
]

await GenreModel.insertMany(genres)
console.log("Inserted genres")


dbClose()
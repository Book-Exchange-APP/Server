import { AppointmentModel, BookModel, LocationModel, UserModel, dbClose} from "./db.js"

await BookModel.deleteMany()
await LocationModel.deleteMany()
await AppointmentModel.deleteMany()
await UserModel.deleteMany()

const locations = [
    {   
        location: "Brisbane City", 
        address: "5 Queen st, Brisbane City",
        postcode: 4000,
        phone: 12345678
    },
    {
        location: "South Brisbane",
        address: "10 Watson st, Acacia Ridge",
        postcode: 4110,
        phone: 24681012
    },
    {
        location: "North Brisbane",
        address: "22 Rainbow st, Sandgate",
        postcode: 4017,
        phone: 135791113
    }
]

const locs = await LocationModel.insertMany(locations)
console.log('Inserted locations')

const books = [
    {
        title: 'Lord Of The Rings',
        author: 'J. R. R. Tolkien',
        condition: 'Good',
        location: locs[1],
        language: 'English',
        img: 'IMAGE',
        genre: 'Fantasy',
        description: 'One ring to rule them all'
    },
    {
        title: 'Game of Thrones',
        author: 'George R. R. Martin',
        condition: 'Good',
        location: locs[2],
        language: 'English',
        img: 'IMAGE',
        genre: 'Fantasy',
        description: 'Winter is Coming'
    },
    {
        title: 'Winnie the Pooh',
        author: 'A. A. Milne',
        condition: 'Good',
        location: locs[0],
        language: 'English',
        img: 'IMAGE',
        genre: 'Fantasy',
        description: "Somebody's eaten all the Honey"
    },
    {
        title: 'Matilda',
        author: 'Rohld Dahl',
        condition: 'Good',
        location: locs[0],
        language: 'English',
        img: 'IMAGE',
        genre: 'Fantasy',
        description: "Matilda, Matilda she's really very small. But inside she's TALL"
    },
]

const book = await BookModel.insertMany(books)
console.log('Inserted books')

const appointments = [
    {
        first_name: 'Tom',
        last_name: 'Cruise',
        inc_book: book[0],
        out_book: book[1],
        time: '1300',
        date: '12/2/2023',
        status: 'Pending'
    },
    {
        first_name: 'Betty',
        last_name: 'White',
        inc_book: book[2],
        out_book: book[3],
        time: '1300',
        date: '04/12/2022',
        status: 'Pending'
    }
]

await AppointmentModel.insertMany(appointments)
console.log('Inserted appointments')

const users = [
    {
        name: 'Mary Smith',
        email: 'mary@bookstore.com',
        password: 'admin',
        status: 'admin'
    }
]

await UserModel.insertMany(users)
console.log('Inserted users')


dbClose()
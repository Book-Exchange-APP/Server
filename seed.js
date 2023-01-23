import { AppointmentModel, BookModel, LocationModel, UserModel, dbClose} from "./db.js"

await BookModel.deleteMany()
await LocationModel.deleteMany()
await AppointmentModel.deleteMany()
await UserModel.deleteMany()

const books = [
    { title: 'Lord Of The Rings', author: 'J. R. R. Tolkien'},
    { title: 'Game of Thrones', author: 'George R. R. Martin'},
    { title: 'Winnie the Pooh', author: 'A. A. Milne'},
    { title: 'Matilda', author: 'Roald Dahl'},
]

await BookModel.insertMany(books)
console.log('Inserted books')

const locations = [
    { location: "Brisbane City", address: "5 Queen st, Brisbane City", postcode: 4000, phone: 12345678},
    { location: "South Brisbane", address: "10 Watson st, Acacia Ridge", postcode: 4110, phone: 24681012},
    { location: "North Brisbane", address: "22 Rainbow st, Sandgate", postcode: 4017, phone: 135791113}
]

await LocationModel.insertMany(locations)
console.log('Inserted locations')

const appointments = [
    { name: 'Tom Cruise', inc_book: 'Dune', out_book: 'Matilda', date: '12/2/2023', location: 'Brisbane City' , status: 'Pending'},
    { name: 'Betty White', inc_book: 'How to Kill a Mockingbird', out_book: 'Winnie the Pooh', date: '23/4/2023', location: 'South Brisbane' , status: 'Pending'}
]

await AppointmentModel.insertMany(appointments)
console.log('Inserted appointments')

const users = [
    { name: 'Mary Smith', email: 'mary@bookstore.com', password: 'admin', status: 'admin'}
]

await UserModel.insertMany(users)
console.log('Inserted users')

dbClose()
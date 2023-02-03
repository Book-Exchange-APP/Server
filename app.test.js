import app from './app.js'
import request from 'supertest'
import { BookModel } from './db.js'
import { AppointmentModel } from './db.js'

describe("Application Unit tests", () =>{
    let token = ''
    let conditions = []
    let locations = []
    let languages = []
    let genres = []
    let bookStatus = []
    let appointStatus = []
    let books = []
    let appointments = []
    
    beforeEach(async () => {

         const response = await request(app).post('/users/login').send({
            email: "admin@bookstore.com",
            password: "admin"
         })

         token = response.body.token;

         const con = await request(app).get('/conditions')
         conditions = con.body

         const loc = await request(app).get('/locations')
         locations = loc.body
         
         const lang = await request(app).get('/languages')
         languages = lang.body

         const gen = await request(app).get('/genres')
         genres = gen.body

         const stat = await request(app).get('/status/books')
         bookStatus = stat.body

         const appoint = await request(app).get('/status/appointments')
         appointStatus = appoint.body
         
         const book = await request(app).get('/books')
         books = book.body

         const appo = await request(app).get('/appointments')
         appointments = appo.body

        })

    test('GET Home page', async () => {
        const res = await request(app).get('/')
            expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
            expect(res.status).toBe(200)
            expect(res.body.info).toBeDefined()
            expect(res.body.info).toBe('Book Exchange API')
    })

    describe('Login a User POST /users/login', () => {
        let res

        beforeEach(async () => {
        res = await request(app).post('/users/login').send({
            email: "admin@bookstore.com",
            password: "admin"
         })
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        
        })

        
        it('Has an element with the correct structure', () => {
                expect(res.body._id).toBeDefined()
                expect(res.body.name).toBeDefined()
                expect(res.body.email).toBeDefined()
                expect(res.body.token).toBeDefined()
                expect(res.body.admin).toBeDefined()
                expect(res.body.admin).toBeTruthy()
        })

        it('Returns an element with the correct Data', () => {
            
            expect(res.body.name).toBe("Mary Smith")
            expect(res.body.email).toBe("admin@bookstore.com")
            expect(res.body.admin).toBe(true)

         })

    })

    describe('Register a user POST /users', () => {
        let res

        beforeEach(async () => {
        res = await request(app).post('/users').send({
            name: "Ryan",
            email: "Ryan@google.com",
            password: "password"
         })
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(201)
        
        })

        
        it('Has an element with the correct structure', () => {
                expect(res.body._id).toBeDefined()
                expect(res.body.name).toBeDefined()
                expect(res.body.email).toBeDefined()
                expect(res.body.token).toBeDefined()
                expect(res.body.admin).toBeDefined()
                expect(res.body.admin).toBeFalsy()
        })

    })

    describe('GET /books', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/books')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Has element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el.book._id).toBeDefined()
                expect(el.book.title).toBeDefined()
                expect(el.book.author).toBeDefined()
                expect(el.book.status).toBeDefined()
                expect(el.book.genre).toBeDefined()
                expect(el.book.language).toBeDefined()
                expect(el.book.condition).toBeDefined()
                expect(el.book.description).toBeDefined()
                expect(el.book._id.length).toBe(24)
            })

        })
    })

    test('Update a Book', async () => {
        const id = books[4].book._id

        let testBook = await BookModel.findById(id)

        const res = await request(app).put(`/books/${testBook._id}`).set('Authorization', `Bearer ${token}`).send({
                title: "Something Else",
                author: "Herman Melville",
                condition: conditions[1]._id,
                location: locations[0]._id,
                language: languages[2]._id,
                img: testBook.img,
                genre: genres[2]._id,
                description: "Different Description"
        })

        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Something Else')
        expect(res.body.description).toBe('Different Description')
        expect(res.body.language.name).toBe('Korean')
        expect(res.body.status.name).toBe(bookStatus[0].name)
    })

    
    describe('GET /appointments', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/appointments')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Has an element with the correct structure', () => {
            
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.first_name).toBeDefined()
                expect(el.last_name).toBeDefined()
                expect(el.inc_book).toBeDefined()
                expect(el.out_book).toBeDefined()
                expect(el.time).toBeDefined()
                expect(el.date).toBeDefined()
                expect(el.status).toBeDefined()
                expect(el._id.length).toBe(24)
            })
            
            expect(res.body[1].first_name).toBe("Robin")
            expect(res.body[1].status.name).toBe("Pending")

        })
    })

    test('Update an Appointment PUT /appointments', async () => {
        const id = appointments[0]._id

        let testAppointment = await AppointmentModel.findById(id)


        const res = await request(app).put(`/appointments/${testAppointment._id}`).set('Authorization', `Bearer ${token}`).send({
                first_name: "Tom",
                last_name: "Cruise",
                inc_book: books[4].book._id,
                out_book: books[1].book._id,
                time: "13:00",
                date: "12/2/2023",
                status: appointStatus[2],
                location: locations[1]
        })
        
            expect(res.body._id).toBeDefined()
            expect(res.body.first_name).toBeDefined()
            expect(res.body.last_name).toBeDefined()
            expect(res.body.inc_book).toBeDefined()
            expect(res.body.out_book).toBeDefined()
            expect(res.body.time).toBeDefined()
            expect(res.body.date).toBeDefined()
            expect(res.body.status).toBeDefined()
            expect(res.body._id.length).toBe(24)
        
            expect(res.body.first_name).toBe("Tom")
            expect(res.body.status).toBe(appointStatus[2]._id)

    })
    

    describe('GET /locations', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/locations')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 3 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(3)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.location).toBeDefined()
                expect(el.address).toBeDefined()
                expect(el.phone).toBeDefined()
                expect(el.postcode).toBeDefined()
                expect(el.email).toBeDefined()
                expect(el._id.length).toBe(24)
            })
            
            expect(res.body[0].location).toBe('Brisbane City')
            expect(res.body[0].postcode).toBe(4000)

        })
    })

    describe('GET /conditions', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/conditions')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 3 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(3)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()

            })
            
            expect(res.body[0].name).toBe('Poor')

        })
    })

    describe('GET /genres', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/genres')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 4 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(4)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()

            })
            
            expect(res.body[0].name).toBe('Fantasy')

        })
    })

    describe('GET /languages', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/languages')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 4 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(4)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()

            })
            
            expect(res.body[0].name).toBe('English')

        })
    })

    describe('GET status/books', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/status/books')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 3 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(3)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()

            })
            
            expect(res.body[0].name).toBe('Available')

        })
    })

    describe('GET appointment/status', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/status/appointments')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Should return an array of 3 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(3)  
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()

            })
            
            expect(res.body[0].name).toBe('Pending')

        })
    })

})

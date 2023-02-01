import app from './app.js'
import request from 'supertest'

describe("Application Unit tests", () =>{
    let token = ''
    let conditions = []
    let locations = []
    let languages = []
    let genres = []
    let bookStatus = []
    let appointStatus = []
    let books = []
    
    beforeEach(async () => {

         const response = await request(app).post('/users/login').send({
            email: "admin@bookstore.com",
            password: "admin"
         })
         token = response.body.token;

         const res = await request(app).get('/conditions')
         conditions = res.body

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

        })

    test('GET Home page', async () => {
        const res = await request(app).get('/')
            expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
            expect(res.status).toBe(200)
            expect(res.body.info).toBeDefined()
            expect(res.body.info).toBe('Book Exchange API')
    })

    test('Create a new Book', async () => {
        const res = await request(app).post('/books').send({
                title: "Moby Dick",
                author: "Herman Melville",
                condition: conditions[0]._id,
                location: locations[1]._id,
                language: languages[2]._id,
                img: "Image.jpeg",
                genre: genres[0]._id,
                description: "Book about a guy trapped in a whale"
        })

        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Moby Dick')
        expect(res.body.language.name).toBe('Korean')


    })

    describe('GET /books', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/books')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.title).toBeDefined()
                expect(el.author).toBeDefined()
                expect(el.status).toBeDefined()
                expect(el.genre).toBeDefined()
                expect(el.language).toBeDefined()
                expect(el.condition).toBeDefined()
                expect(el.description).toBeDefined()
                expect(el._id.length).toBe(24)
            })
            
            expect(res.body[1].description).toBe("Somebody's eaten all the Honey")
            expect(res.body[2].status.name).toBe("Available")

        })
    })

    test('Update a Book', async () => {
        const id = books[4]._id
        const res = await request(app).put(`/books/${id}`).set('Authorization', `Bearer ${token}`).send({
                title: "Moby Dick",
                author: "Herman Melville",
                condition: conditions[1]._id,
                location: locations[0]._id,
                language: languages[2]._id,
                img: "Image.jpeg",
                genre: genres[2]._id,
                description: "Book about a guy trapped in a whale"
        })
        console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Moby Dick')
        expect(res.body.language.name).toBe('Korean')
        expect(res.body.status.name).toBe(bookStatus[0].name)
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
                expect(el._id.length).toBe(24)
            })
            
            expect(res.body[0].location).toBe('Brisbane City')

        })
    })

    describe('GET /appointments', () => {
        let res

        beforeEach(async () => {
        res = await request(app).get('/books')
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.status).toBe(200)
        })

        it('Has an element with the correct structure', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.title).toBeDefined()
                expect(el.author).toBeDefined()
                expect(el.status).toBeDefined()
                expect(el.genre).toBeDefined()
                expect(el.language).toBeDefined()
                expect(el.condition).toBeDefined()
                expect(el.description).toBeDefined()
                expect(el._id.length).toBe(24)
            })
            
            expect(res.body[1].description).toBe("Somebody's eaten all the Honey")
            expect(res.body[2].status.name).toBe("Available")

        })
    })

    test('Create a new Book', async () => {
        const res = await request(app).post('/books').send({
                title: "Moby Dick",
                author: "Herman Melville",
                condition: conditions[0]._id,
                location: locations[1]._id,
                language: languages[2]._id,
                img: "Image.jpeg",
                genre: genres[0]._id,
                description: "Book about a guy trapped in a whale"
        })

        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Moby Dick')
        expect(res.body.language.name).toBe('Korean')


    })

    test('Update a Book', async () => {
        const id = books[4]._id
        const res = await request(app).put(`/books/${id}`).set('Authorization', `Bearer ${token}`).send({
                title: "Moby Dick",
                author: "Herman Melville",
                condition: conditions[1]._id,
                location: locations[0]._id,
                language: languages[2]._id,
                img: "Image.jpeg",
                genre: genres[2]._id,
                description: "Book about a guy trapped in a whale"
        })
        console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Moby Dick')
        expect(res.body.language.name).toBe('Korean')
        expect(res.body.status.name).toBe(bookStatus[0].name)
    })
})

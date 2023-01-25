import app from './app.js'
import request from 'supertest'

describe("App tests", () =>{
    test('GET Home page', async () => {
        const res = await request(app).get('/')
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.status).toBe(200)
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Book Exchange API')
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
    test('Create a new Book', async () => {
        const res = await request(app).post('/books').send({
                title: "Moby Dick",
                author: "Herman Melville",
                condition: "Poor",
                location: "63cf2808f95b7054e65ca4fa",
                language: "English",
                img: "Imange.jpeg",
                genre: "Adventure",
                description: "Book about a guy trapped in a whale"
        })
        
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.location).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.title).toBe('Moby Dick')
        expect(res.body.language).toBe('English')


    })
})
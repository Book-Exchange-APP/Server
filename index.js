import express from 'express'
import appointmentRoutes from './routes/appointment_routes.js'
import bookRoutes from './routes/book_routes.js'
import locationRoutes from './routes/location_routes.js'
import userRoutes from './routes/user_routes.js'

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => {
    res.send({ 
        info: 'Book Exchange API',
        routes: '/books'
     })
})

app.use('/books', bookRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/locations', locationRoutes)
app.use('/users', userRoutes)

app.listen(port, () => console.log(`App Running at ${port}`))
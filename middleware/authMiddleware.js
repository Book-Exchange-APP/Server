import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 })
}

// Function to protect routes
const routeGuard = async (req,res, next) => {
    let token
    // Check and get token from header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Seperate Token from Bearer in Header
            token = req.headers.authorization.split(' ')[1]
            
            // Token Verification
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Get User ID from Token payload
            req.user = await UserModel.findById(decode.id)

            next()
        } catch (err) {
            res.status(401).send({ error : err.message })
            
        }
        if (!token) {
            res.status(401).send({ error : err.message })
        }
    }
}

export { createToken, routeGuard }
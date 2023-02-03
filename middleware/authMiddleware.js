import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 })
}

const routeGuard = async (req,res, next) => {
    
    // Check and get token from header
    const {authorization } = req.headers

    if ( !authorization ) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    // Seperate Token from Bearer in Header
    const token = authorization.split(' ')[1]
    
    try {
        // Token Verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        req.user = await UserModel.findById(decoded.id)

        next()

    }   catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }

}

export { createToken, routeGuard }
import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 })
}

const routeGuard = async (req,res, next) => {
    

    const {authorization } = req.headers

    if ( !authorization ) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        req.user = await UserModel.findById(decoded.id)

        next()

    }   catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }

    // Check and get token from header
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     try {
    //         // Seperate Token from Bearer in Header
    //         token = req.headers.authorization.split(' ')[1]
            
    //         // Token Verification
    //         const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    //         // Get User ID from Token payload
    //         req.user = await UserModel.findById(decode.id)

    //         next()
    //     } catch (err) {
    //         res.status(401).send({ error : err.message })
            
    //     }
    //     if (!token) {
    //         res.status(401).send({ error : err.message })
    //     }
    // } else {
    //     res.status(401).send( {error: 'Unauthorised Access'} )
    // }
}

export { createToken, routeGuard }
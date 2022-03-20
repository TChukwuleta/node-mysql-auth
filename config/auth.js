const db = require('./dbConfig')
const jwt = require('jsonwebtoken')

const loggedInAuth = (req, res, next) => {
    if (!req.cookies.UserLogin) return next()
    try {
        const decoded = jwt.verify(req.cookies.UserLogin, process.env.SecretKey)
    } catch (error) {
        if(error) return next
    }
}
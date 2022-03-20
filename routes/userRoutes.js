const express = require('express')
const loggedInAuth = require('../config/auth')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

// router.get('/money', loggedInAuth, (req, res) => {
//     res.send("money")
// })

module.exports = router
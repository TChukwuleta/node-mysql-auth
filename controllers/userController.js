const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.users

const registerUser = async (req, res) => {
    const { email, password, username } = req.body
    if(!email || !password || !username){
        return res.status(400).json({ message: "Please fill in all required fields" })
    }
    const findUser = await User.findOne({ where: {  email: email }})
    if(findUser){
        return res.status(400).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(user)
    res.status(201).json({ message: "User has been created successfully" })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ message: "Please enter your email and password" })
    const user = await User.findOne({ where: { email: email }})
    if(!user){
        return res.status(400).json({ message: "No user found" })
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword){
        return res.status(400).json({ message: "Incorrect Email or Password" })
    }
    const token = jwt.sign({
        username: user.username
    }, process.env.SecretKey, {
        expiresIn: 100000
    })

    const cookieOptions = {
        expiresIn: new Date(Date.now() + process.env.CookieExpires)
    }
    res.cookie("UserLogin", token, cookieOptions)
    return res.status(201).json({ message: `Token is ${token}` })
}

const logout = (req, res) => {
    res.clearCookie('UserLogin')
    res.status(201).json({ message: "Logged out successfully" })
}


module.exports = {
    registerUser,
    loginUser
}
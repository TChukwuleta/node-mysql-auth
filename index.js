const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const dotenv = require('dotenv').config()
const routes = require('./routes/userRoutes')

// app.use('/js', express.static(__dirname + './public/js'))
// app.use('/css', express.static(__dirname + './public/css'))
// app.set("view engine", "ejs")
// app.set("views", "./views")
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

const port = process.env.PORT || 2022

app.listen(port, () => {
    console.log(`App is up and running on port ${port}`)
})
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectMongoDB = require('./db/mongodb')
const { PORT, MONGO_URI } = process.env

const albums = require('./routes/albums')
const users = require('./routes/users')
const register = require('./routes/register')
//const authentication = require('./middleware/authentication')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//app.use('/api/albums/', authentication)

// static assets
app.use(express.static('./public'))



app.use('/api/albums', albums)
app.use('/api/users', users)
app.use('/api/register', register)

app.use(errorHandlerMiddleware)

connectMongoDB(MONGO_URI)


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})


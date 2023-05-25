require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectMongoDB = require('./db/mongodb')
const errorHandlerMiddleware = require('./middleware/error-handler')

const config = require('./utils/config')
const albums = require('./routes/albums')

const app = express()

// static assets
app.use(express.static('./public'))

app.use(express.json())

app.use('/api/albums', albums)

app.use(errorHandlerMiddleware)

connectMongoDB(config.MONGODB_URI)

module.exports = app



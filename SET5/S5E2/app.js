require('dotenv').config()
const express = require('express')
const app = express()
const connectMongoDB = require('./db/mongodb')
const { PORT, MONGO_URI } = process.env

const albums = require('./routes/albums')
//const authentication = require('./middleware/authentication')


app.use(express.json())
//app.use('/api/albums/', authentication)
app.use('/api/albums', albums)
// static assets
app.use(express.static('./public'))

connectMongoDB(MONGO_URI)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})


require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path')
const config = require('./utils/config')
const connectMongoDB = require('./db/mongodb')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')

const albums = require('./routes/albums')
const users = require('./routes/users')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const myCollection = require('./routes/myCollection')

const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// static assets
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    name: 'session_id',
    secret: config.SESSION_SECRET || 'super_secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: config.MONGODB_URI,
        collection: 'passport-sessions',
    }),
    // Enable next line when using https
    // cookie: { secure: true }
}))

app.use(passport.authenticate('session'))

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/api/albums', albums)
app.use('/api/users', users)
app.use('/myCollection', myCollection)

app.use(errorHandlerMiddleware)

connectMongoDB(config.MONGODB_URI)


app.listen(config.PORT, () => {
    console.log(`server listening on port ${config.PORT}...`)
})


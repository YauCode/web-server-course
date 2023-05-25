const express = require('express')
const app = express()
const PORT = 3000
const albums = require('./routes/albums')
const authentication = require('./middleware/authentication')


app.use(express.json())
app.use('/api/albums/', authentication)
app.use('/api/albums', albums)
app.use(express.static('./public'))


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})


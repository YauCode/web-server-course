const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3000

let { albums } = require('./data')

app.get('/', (req, res) => {
    res.send('<h1>Album collection app</h1><a href="/api/albums">albums</a>')
})

// GET 
app.get('/api/albums', (req, res) => {
    const newAlbums = albums.map((album) => {
        const { id, artist, title, year, genre, tracks } = album
        return { id, artist, title, year, genre, tracks }
    })
    res.json(newAlbums)
})

// GET:ID
app.get('/api/albums/:albumID', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    const { albumID } = req.params
    const singleAlbum = albums.find(
        (album) => album.id === Number(albumID)
    )
    if (!singleAlbum) {
        return res.status(404).send('Album not found!')
    }
    return res.json(singleAlbum)
})

// PUT
app.put('/api/albums/:id', (req, res) => {
    const { id } = req.params
    const { artist } = req.body
    const { title } = req.body
    const { year } = req.body
    const { genre } = req.body
    const { tracks } = req.body

    const album = albums.find((album) => album.id === Number(id))

    if (!album) {
        return res
            .status(404)
            .json({ success: false, msg: `No album found with id ${id}` })
    }
    const newAlbums = albums.map((album) => {
        if (album.id === Number(id)) {
            album.artist = artist
            album.title = title
            album.year = year
            album.genre = genre
            album.tracks = tracks
        }
        return album
    })
    res.status(200).json({ success: true, data: newAlbums })
})

// DELETE
app.delete('/api/albums/:id', (req, res) => {
    const { id } = req.params
    const album = albums.find((album) => album.id === Number(id))
    if (!album) {
        return res
            .status(404)
            .json({ success: false, msg: `No album found with id ${id}` })
    }
    const newAlbums = albums.filter(
        (album) => album.id !== Number(id)
    )
    albums = newAlbums
    return res.status(200).json({ success: true, data: albums })
})

// POST
app.post('/api/albums/', (req, res) => {
    console.log(req.body)
    const { artist } = req.body
    const { title } = req.body
    const { year } = req.body
    const { genre } = req.body
    const { tracks } = req.body

    if (!artist || !title || !year || !genre || !tracks) {
        return res
            .status(400)
            .json({ success: false, msg: 'Some album data is not provided' })
    }

    const maxId = Math.max(...albums.map(album => album.id), 0)
    const newID = (maxId + 1)
    const album = {
        id: newID,
        artist,
        title,
        year,
        genre,
        tracks
    }
    albums = albums.concat(album)
    res.status(201).json({ success: true, data: album })
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})


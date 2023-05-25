/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const Album = require('../models/Album')
const testAlbums = require('./data.json')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Album.deleteMany({})
    await Album.create(testAlbums)
})

// S8E3 TEST
test('Deletion of a album that checks if the deletion has occured', async () => {
    const albums = await Album.find({})
    const singleAlbum = albums[0]

    await api
        .delete('/api/albums/' + singleAlbum._id)
        .expect(200)

    const response = await api.get('/api/albums')
    expect(response.body.albums).toHaveLength(testAlbums.length - 1)
    expect(response.body.albums).not.toContainEqual(singleAlbum)
})

afterAll(() => {
    mongoose.connection.close()
})
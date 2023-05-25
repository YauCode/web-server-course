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

// S8E2 TEST
test('POST request is working as expected ', async () => {
    const newAlbum = {
        'artist': 'NEW',
        'title': 'NEW',
        'year': 2000,
        'genre': 'NEW',
        'tracks': 5
    }
    await api
        .post('/api/albums')
        .send(newAlbum)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/albums')
    expect(response.body.albums).toHaveLength(testAlbums.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})
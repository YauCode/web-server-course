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

test('Exact number of albums in database ', async () => {
    const response = await api.get('/api/albums')
    expect(response.body.albums).toHaveLength(testAlbums.length)
})

afterAll(() => {
    mongoose.connection.close()
})
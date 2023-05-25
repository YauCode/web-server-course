const mongoose = require('mongoose')
const { Schema } = mongoose

const roles = ['admin', 'user']

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: [true, 'User role must be provided'],
        enum: roles,
        default: 'user',
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    passwordHash: String,
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }]
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User

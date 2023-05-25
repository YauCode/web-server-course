const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { createUser } = require('../controllers/usersController')

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await User.findOne({ username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return cb(null, false, { message: 'Incorrect username or password.' })
        }
        return cb(null, user)
    } catch (err) {
        return cb(err)
    }
}))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username })
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

// eslint-disable-next-line no-unused-vars
router.get('/login', (req, res, next) => {
    res.redirect('/login.html')
})

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})

// eslint-disable-next-line no-unused-vars
router.get('/register', (req, res, next) => {
    res.redirect('/register.html')
})
router.post('/register', createUser)


module.exports = router

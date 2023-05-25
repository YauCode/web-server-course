const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    if (!req.user) {
        return res.status(401).send(`
                    <p><a href="login.html">Log in</a></p>
                    <p><a href="register.html">Register</a></p>`
        )
    }
    console.log(req.user)
    next()
    // eslint-disable-next-line no-unused-vars
}, (req, res, next) => {
    res.status(200).send(`
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User profile</title>
    </head>
    <body>
      <form action="/logout" method="post">
        <div>
            <button type="submit">Logout</button>
        </div>
      </form>
      
      <h1>Logged in as ${req.user.username}</h1>
      
    </body>
    </html>`)
})

module.exports = router


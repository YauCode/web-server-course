const http = require('http')
const { readFileSync } = require('fs')

const root = readFileSync('./S1E3/index.html')
// jsondata
const jsondata = { count: 35, message: 'Welcome' }

const server = http.createServer((req, res) => {
    const url = req.url
    console.log(url)

    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(root)
        res.end()
    }
    // /data
    else if (url === '/data') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.write(JSON.stringify(jsondata))
        res.end()
    }

    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Not found</h1>')
        res.end()
    }
})
server.listen(5001)
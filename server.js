const path = require('path')
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = routes.getRequestHandler(app)

const PORT = process.env.PORT || 3001

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && !dev ? 60 * 60 * 24 * 30 : 0 })

app.prepare().then(() => {
    const server = express()
    server.use(cookieParser())
    server.use('/favicon.ico', serve('./public/tatic/favicon.ico'))
    server.use('/sw.js', serve('./public/static/sw.js'))
    server.get('/article/:id', (req, res) => {
        return app.render(req, res, '/article', { id: req.params.id })
    })
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> App running on port ${PORT}`)
    })
})

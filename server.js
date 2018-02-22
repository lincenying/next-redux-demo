const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
    const server = express()
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

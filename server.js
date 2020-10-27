const path = require('path')
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = routes.getRequestHandler(app)

const PORT = process.env.PORT || 8033

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && !dev ? 60 * 60 * 24 * 30 : 0 })

const proxyTable = {
    '/api': {
        target: 'https://www.vue-js.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}

app.prepare().then(() => {
    const server = express()
    Object.keys(proxyTable).forEach(function (context) {
        let options = proxyTable[context]
        if (typeof options === 'string') {
            options = {
                target: options
            }
        }
        server.use(createProxyMiddleware(context, options))
    })
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
        console.log(`> App running at:`)
        console.log(`  - http://localhost:${PORT}/`)
    })
})

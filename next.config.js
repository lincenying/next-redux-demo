/* eslint-disable no-inline-comments */
const path = require('path')
const withLess = require('@zeit/next-less')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = withLess({
    webpack: (config, { dev, isServer }) => {
        const oldEntry = config.entry
        // 浏览器端
        if (!isServer) {
            config.resolve.alias['~api'] = path.join(__dirname, 'api/index-client.js')
        } else {
            config.resolve.alias['~api'] = path.join(__dirname, 'api/index-server.js')
        }
        config.resolve.alias['@'] = path.join(__dirname)
        config.entry = () =>
            oldEntry().then(entry => {
                if (entry['main.js']) entry['main.js'].push(path.resolve('./utils/offline'))
                return entry
            })

        /* Enable only in Production */
        if (!dev) {
            // Service Worker
            config.plugins.push(
                new SWPrecacheWebpackPlugin({
                    cacheId: 'next-demo',
                    filepath: './static/sw.js',
                    minify: true,
                    staticFileGlobsIgnorePatterns: [/\.next\//],
                    staticFileGlobs: [
                        'static/**/*', // Precache all static files by default
                    ],
                    runtimeCaching: [
                        // Example with different handlers
                        {
                            handler: 'fastest',
                            urlPattern: /[.](png|jpg|css)/,
                        },
                        {
                            handler: 'networkFirst',
                            urlPattern: /^http.*/, //cache all files
                        },
                    ],
                }),
            )
        }
        return config
    },
})

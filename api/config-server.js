var lruCache = require('lru-cache')

let api

if (process.__API__) {
    api = process.__API__
} else {
    api = process.__API__ = {
        api: 'https://www.vue-js.com/api/v1/',
        port: 3030,
        timeout: 30000,
        cached: new lruCache({
            max: 1000,
            // 缓存时间 5分钟
            maxAge: 1000 * 60 * 5
        }),
        cachedItem: {}
    }
}

module.exports = api

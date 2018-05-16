import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'
import { parseCookie } from '../utils'

export default {
    api: axios.create({
        baseURL: config.api,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: config.timeout
    }),
    post(url, data, cookies = {}) {
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(data) + username)
        if (config.cached && data.cache && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie: parseCookie(cookies)
            }
        }).then(res => {
            if (config.cached && data.cache) config.cached.set(key, res)
            return res
        })
    },
    async get(url, params, cookies = {}) {
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(params) + username)
        if (config.cached && params.cache && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'get',
            url,
            params,
            headers: {
                cookie: parseCookie(cookies)
            }
        }).then(res => {
            if (config.cached && params.cache) config.cached.set(key, res)
            return res
        })
    }
}

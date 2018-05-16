import toastr from 'toastr'

toastr.options.positionClass = 'toast-top-center'

const in_browser = typeof window !== 'undefined'

export const inBrowser = in_browser

export const showMsg = config => {
    let content, type
    if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    if (in_browser) toastr[type](content)
}

export const hideMsg = () => {
    toastr.clear()
}

export const ua = () => {
    const userAgentInfo = inBrowser ? navigator.userAgent : ''
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    let flag = 'PC'
    for (let vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}
export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie += item + '=' + cookies[item] + '; '
    })
    return cookie
}

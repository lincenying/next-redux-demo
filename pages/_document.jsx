import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { readFileSync } from 'fs'

let version = ''

if (process.env.NODE_ENV === 'production') {
    version = `?v=${readFileSync(`${process.cwd()}/.next/BUILD_ID`)}`
}

export default class MyDocument extends Document {
    render() {
        return (
            <html style={{ background: '#EEE', color: '#444' }}>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
                    />
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="stylesheet" href={`/_next/static/style.css${version}`} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

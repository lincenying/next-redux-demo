/* eslint-disable no-inline-comments */
import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

let version = ''

if (process.env.NODE_ENV === 'production') {
    const readFileSync = require('fs').readFileSync
    version = `?v=${readFileSync(`${process.cwd()}/.next/BUILD_ID`)}`
}

export default class MyDocument extends Document {
    render() {
        return (
            <Html style={{ background: '#EEE', color: '#444' }}>
                <Head>
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href={`/static/manifest.json${version}`} />
                    {/* <link rel="stylesheet" href={`/_next/static/style.css${version}`} /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

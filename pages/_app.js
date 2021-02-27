/* eslint-disable react/jsx-filename-extension */
import React from 'react'

import App from 'next/app'
import Head from 'next/head'

import { wrapper } from '~/store'
import '~/utils/offline'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}

export default wrapper.withRedux(MyApp)

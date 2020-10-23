/* eslint-disable react/jsx-filename-extension */
import withRedux from 'next-redux-wrapper'
import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import store from '~/store'
import '~/utils/offline'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={store}>
                <Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                </Head>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(store)(MyApp)

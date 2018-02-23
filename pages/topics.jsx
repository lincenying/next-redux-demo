import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import ls from 'store2'
import { Link } from '../routes'
import initStore from '../store'

import { getTopics } from '../store/reducers/topics'

class Topics extends Component {
    static async getInitialProps({ store, isServer }) {
        if (isServer) await store.dispatch(getTopics({page: 1}))
    }
    constructor(props) {
        super(props)
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.onScroll = this.onScroll.bind(this)
    }
    async componentDidMount() {
        const { lists, dispatch, url } = this.props
        if (lists.length === 0) await dispatch(getTopics({page: 1}))
        const path = url.pathname
        const scrollTop = ls.get(path) || 0
        ls.remove(path)
        if (scrollTop) {
            window.requestAnimationFrame(() => window.scrollTo(0, scrollTop))
        }
        window.addEventListener('scroll', this.onScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }
    async handleLoadMore() {
        const { page, dispatch } = this.props
        await dispatch(getTopics({page: page + 1}))
    }
    onScroll() {
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        const path = this.props.url.pathname
        if (path && scrollTop) ls.set(path, scrollTop)
    }
    render() {
        const { lists } = this.props
        return (
            <div className="main" style={{ 'width': '1024px', 'margin': '0 auto', 'background': '#fff', 'padding': '20px' }}>
                <Head>
                    <title>首页</title>
                </Head>
                <ul>
                    {
                        lists.map(item => {
                            return <li key={item.id}><Link route='article' params={{ id: item.id }}><a>{ item.title }</a></Link></li>
                        })
                    }
                    <li><a onClick={this.handleLoadMore} href="JavaScript:;">加载下一页</a></li>
                </ul>
                <style jsx>{`
                    .main {
                        width: 1024px;
                        margin: 0 auto;
                        background: #fff;
                        padding: 20px;
                    }
                `}</style>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lists: state.topics.toJS().data,
        page: state.topics.toJS().page,
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getTopics }, dispatch)
    return { ...actions, dispatch }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Topics)


import { Avatar, Button } from 'antd'
import Head from 'next/head'
import Router from 'next/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ls from 'store2'
import '~/assets/less/index.less'
import { Link } from '~/routes'
import { getTopics } from '~/store/reducers/topics'

@connect(
    state => ({
        lists: state.topics.toJS().data,
        page: state.topics.toJS().page
    }),
    dispatch => ({ ...bindActionCreators({ getTopics }, dispatch), dispatch })
)
class Topics extends Component {
    static async getInitialProps({ req, store, isServer }) {
        const cookies = isServer ? req.headers.cookie : null
        if (isServer) {
            await store.dispatch(getTopics({ page: 1, cache: true }, cookies))
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.onScroll = this.onScroll.bind(this)
    }
    async componentDidMount() {
        const { lists, dispatch } = this.props
        if (lists.length === 0) await dispatch(getTopics({ page: 1 }))
        const path = Router.pathname
        const scrollTop = ls.get(path) || 0
        ls.remove(path)
        if (scrollTop) {
            window.requestAnimationFrame(() => window.scrollTo(0, scrollTop))
        }
        window.addEventListener('scroll', this.onScroll)
    }
    shouldComponentUpdate() {
        return true
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }
    async handleLoadMore() {
        const { page, dispatch } = this.props
        this.setState({ loading: true })
        await dispatch(getTopics({ page: page + 1 }))
        this.setState({ loading: false })
    }
    onScroll() {
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        const path = Router.pathname
        if (path && scrollTop) ls.set(path, scrollTop)
    }
    render() {
        const { lists } = this.props
        return (
            <div className="main">
                <Head>
                    <title>首页</title>
                </Head>
                <ul>
                    {lists.map(item => {
                        return (
                            <li key={item.id}>
                                <Avatar src={item?.author?.avatar_url} />
                                <Link route="article" params={{ id: item.id }}>
                                    <a>{item.title}</a>
                                </Link>
                            </li>
                        )
                    })}
                    <li className="page">
                        <Button type="primary" loading={this.state.loading} onClick={this.handleLoadMore}>
                            加载下一页
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Topics

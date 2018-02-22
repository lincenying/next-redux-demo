import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import initStore from '../store'

import { getTopics } from '../store/reducers/topics'

class Topics extends Component {
    static async getInitialProps(ctx) {
        await ctx.store.dispatch(getTopics({page: 1}))
    }
    constructor(props) {
        super(props)
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    shouldComponentUpdate() {
        return true
    }
    async handleLoadMore() {
        const { page, dispatch } = this.props
        await dispatch(getTopics({page: page + 1}))
    }
    render() {
        const { lists } = this.props
        return (
            <ul>
                {
                    lists.map(item => {
                        return <li key={item.id}><Link href={'/article/' + item.id}><a>{ item.title }</a></Link></li>
                    })
                }
                <li><a onClick={this.handleLoadMore} href="JavaScript:;">加载下一页</a></li>
            </ul>
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


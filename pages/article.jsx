import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import initStore from '../store'

import { getArticleItem } from '../store/reducers/article'

class Article extends Component {
    static async getInitialProps(ctx) {
        await ctx.store.dispatch(getArticleItem({id: ctx.query.id}))
    }
    constructor(props) {
        super(props)
    }
    shouldComponentUpdate() {
        return true
    }
    render() {
        const { item } = this.props
        return (
            <div>
                <h3>{item.title}</h3>
                <p><Link href={'/topics'}><a>返回列表</a></Link></p>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        item: state.article.toJS().data,
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getArticleItem }, dispatch)
    return { ...actions, dispatch }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Article)


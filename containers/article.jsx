import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'

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
            <div className="article">
                <Head>
                    <title>{item.title}</title>
                </Head>
                <h3>{item.title}</h3>
                <p><Link href={'/'}><a>返回列表</a></Link></p>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: item.content }} />
                <div className="reply">
                    { item.replies.map(sub_item => {
                        return (
                            <div key={sub_item.id} className="reply-item">
                                <h5>{ sub_item.author.loginname }: <span>[{ item.create_at }]</span></h5>
                                <div className="reply-item-content" dangerouslySetInnerHTML={{ __html: sub_item.content }} />
                            </div>
                        )
                    }) }
                </div>
                <style jsx>{`
                    h3 {
                        text-align: center;
                    }
                    .article {
                        width: 1024px;
                        margin: 0 auto;
                        background: #fff;
                        padding: 20px;
                    }
                    .article-content {
                        word-wrap: break-word;
                    }
                    .reply {
                        border-top: 1px solid #ccc;
                    }
                    .reply-item {
                        border-bottom: 1px dashed #ccc;
                    }
                    .reply-item h5 span {
                        font-weight: 400;
                        font-size: 12px;
                    }
                `}</style>
                <style jsx global>{`
                    pre {
                        overflow: auto;
                    }
                `}</style>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)


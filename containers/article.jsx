import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'

import api from '~api'
import { getArticleItem } from '@/store/reducers/article'

class Article extends Component {
    static async getInitialProps({ req, store, isServer, query }) {
        if (isServer) {
            api.setCookies(req.headers.cookie)
        }
        await store.dispatch(getArticleItem({ id: query.id, cache: true }))
    }
    constructor(props) {
        super(props)
    }
    async componentDidMount() {}
    shouldComponentUpdate() {
        return true
    }
    render() {
        const { item } = this.props
        return (
            <div className="main">
                <Head>
                    <title>{item.title}</title>
                </Head>
                <h3>{item.title}</h3>
                <p>
                    <Link href={'/'}>
                        <a>返回列表</a>
                    </Link>
                </p>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: item.content }} />
                <div className="reply">
                    {item.replies &&
                        item.replies.map(sub_item => {
                            return (
                                <div key={sub_item.id} className="reply-item">
                                    <h5>
                                        {sub_item.author.loginname}: <span>[{item.create_at}]</span>
                                    </h5>
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: sub_item.content,
                                        }}
                                    />
                                </div>
                            )
                        })}
                </div>
                <style jsx>{`
                    h3 {
                        text-align: center;
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
                    .article-content img,
                    .reply-item-content img {
                        max-width: 100%;
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

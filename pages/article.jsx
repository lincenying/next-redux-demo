import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '~/assets/scss/index.scss'
import { getArticleItem } from '~/store/reducers/article'

@connect(
    state => ({
        item: state.article.toJS().data
    }),
    dispatch => ({ ...bindActionCreators({ getArticleItem }, dispatch), dispatch })
)
class Article extends Component {
    static async getInitialProps({ req, store, isServer, query }) {
        const cookies = isServer ? req.headers.cookie : null
        await store.dispatch(getArticleItem({ id: query.id, cache: true }, cookies))
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
                                        {sub_item?.author?.loginname}: <span>[{item.create_at}]</span>
                                    </h5>
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: sub_item.content
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
                        padding-top: 8px;
                        border-bottom: 1px dashed #ccc;
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

export default Article

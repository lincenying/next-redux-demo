import { fromJS } from 'immutable'
import { HYDRATE } from 'next-redux-wrapper'
import { createReducer } from 'redux-immutablejs'
import api from '~api'
import { errConfig } from './global'

const initStates = fromJS({
    data: {},
    pathname: '',
    isLoad: false
})

const reducers = {
    [HYDRATE]: (state, action) => {
        return state.merge(action.payload.article)
    },
    ['receiveArticleItem']: (state, action) => {
        const { data, isLoad } = action
        return state.merge({
            data,
            isLoad
        })
    }
}

export const getArticleItem = (config, cookies) => {
    return async dispatch => {
        const { success, data } = await api.get('topic/' + config.id, { cache: config.cache }, cookies)
        if (success) {
            return dispatch({
                type: 'receiveArticleItem',
                data,
                isLoad: true
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)

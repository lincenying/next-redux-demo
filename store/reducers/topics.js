import { fromJS } from 'immutable'
import { HYDRATE } from 'next-redux-wrapper'
import { createReducer } from 'redux-immutablejs'
import api from '~api'
import { errConfig } from './global'

const initStates = fromJS({
    data: [],
    page: 1
})

const reducers = {
    [HYDRATE]: (state, action) => {
        return state.merge(action.payload.topics)
    },
    ['receiveTopics']: (state, action) => {
        const { list, page } = action
        const lists = page === 1 ? [].concat(list) : state.toJS().data.concat(list)
        return state.merge({
            data: lists,
            page
        })
    }
}

export const getTopics = (config, cookies) => {
    return async dispatch => {
        const { success, data } = await api.get('topics', config, cookies)
        if (success === true) {
            return dispatch({
                type: 'receiveTopics',
                list: data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)

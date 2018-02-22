import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from './global'

const initStates = fromJS({
    data: [],
    page: 1
})

const reducers = {
    ['receiveTopics']: (state, action) => {
        const { list, page } = action
        const lists = page === 1 ? [].concat(list) : state.toJS().data.concat(list)
        return state.merge({
            data: lists,
            page
        })
    },
}

export const getTopics = config => {
    return async dispatch => {
        const { data: { success, data }} = await api.get('topics', config)
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

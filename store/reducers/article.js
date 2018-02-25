import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import api from '~api'
import { errConfig } from './global'

const initStates = fromJS({
    data: {},
    pathname: '',
    isLoad: false
})

const reducers = {
    ['receiveArticleItem']: (state, action) => {
        const { data, isLoad } = action
        return state.merge({
            data,
            isLoad
        })
    }
}

export const getArticleItem = config => {
    return async dispatch => {
        const { data: { success, data } } = await api.get('topic/' + config.id)
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

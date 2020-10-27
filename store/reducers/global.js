import { fromJS } from 'immutable'
import { HYDRATE } from 'next-redux-wrapper'
import { createReducer } from 'redux-immutablejs'

const initStates = fromJS({})

const reducers = {
    [HYDRATE]: (state, action) => {
        return state.merge(action.payload.global)
    }
}

export default createReducer(initStates, reducers)

export const errConfig = {
    type: 'error',
    content: 'api 接口错误'
}

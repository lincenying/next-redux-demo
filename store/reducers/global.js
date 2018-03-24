import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({})

const reducers = {}

export default createReducer(initStates, reducers)

export const errConfig = {
    type: 'error',
    content: 'api 接口错误',
}

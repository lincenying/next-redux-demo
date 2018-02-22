import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    data: []
})

const reducers = {
    ['addTodo']: (state, action) => {
        const { text } = action
        const data = state.toJS().data
        data.push({
            id: Math.random().toString(36).substring(2),
            text
        })
        return state.merge({
            data
        })
    },
    ['removeTodo']: (state, action) => {
        const { todo } = action
        const data = state.toJS().data
        const index = data.findIndex(item => item.id === todo.id)
        if (index > -1) data.splice(index, 1)
        return state.merge({
            data
        })
    }
}

export const addTodo = config => {
    return async dispatch => {
        return dispatch({
            type: 'addTodo',
            ...config
        })
    }
}
export const removeTodo = config => {
    return async dispatch => {
        return dispatch({
            type: 'removeTodo',
            ...config
        })
    }
}

export default createReducer(initStates, reducers)

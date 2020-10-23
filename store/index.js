import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const makeStore = () => createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default makeStore

export const wrapper = createWrapper(makeStore)

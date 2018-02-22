import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

export default initialState => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))


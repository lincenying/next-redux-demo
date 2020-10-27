import { combineReducers } from 'redux'
import article from './article'
import global from './global'
import topics from './topics'

export default combineReducers({ global, topics, article })

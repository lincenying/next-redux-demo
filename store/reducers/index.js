import { combineReducers } from 'redux'

import global from './global'
import todos from './todos'
import topics from './topics'
import article from './article'

export default combineReducers({ global, todos, topics, article })

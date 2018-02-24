import { combineReducers } from 'redux'

import global from './global'
import topics from './topics'
import article from './article'

export default combineReducers({ global, topics, article })

import { combineReducers } from 'redux'

import blogs from './blogs'
import user from './user'

const combinedReducer = combineReducers({
  blogs,
  user,
})

export default combinedReducer

import { combineReducers } from 'redux'

import blogs from './blogs'
import notifications from './notifications'
import user from './user'

const combinedReducer = combineReducers({
  blogs,
  notifications,
  user,
})

export default combinedReducer

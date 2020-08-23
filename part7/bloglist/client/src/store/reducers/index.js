import { combineReducers } from 'redux'

import blogs from './blogs'
import notifications from './notifications'
import user from './user'
import users from './users'

const combinedReducer = combineReducers({
  blogs,
  notifications,
  user,
  users,
})

export default combinedReducer

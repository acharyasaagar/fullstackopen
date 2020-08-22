import { combineReducers } from 'redux'

import blogs from './blogs'
import user from './user'

const reducer = combineReducers({
  blogs,
  user,
})

export default reducer

import thunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers'

const store = createStore(
  blogsReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store

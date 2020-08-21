import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './blogsReducer'

const store = createStore(blogsReducer, composeWithDevTools())

export default store

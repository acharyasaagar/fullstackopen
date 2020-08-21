import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { initBlogsAction } from './store/actionCreators'
import './index.css'

import store from './store'
import App from './components/App'

store.dispatch(initBlogsAction())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

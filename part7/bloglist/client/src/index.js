import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'

import store from './store'
import App from './components/App'

ReactDOM.render(
  <Provider store={store}>
    <Container maxWidth="lg">
      <CssBaseLine />
      <App />
    </Container>
  </Provider>,
  document.getElementById('root')
)

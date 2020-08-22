import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './Notification'

import { loginUser } from '../store/async-actions'

const Login = props => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  return (
    <div className="panel">
      <Notification err={err} success={null} />
      <h4>Login to application</h4>
      <form onSubmit={handleLogin}>
        <section>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            data-test="login-username-input"
            value={username}
            onChange={handleUsernameChange}
          />
        </section>
        <section>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            data-test="login-password-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </section>
        <button type="submit" data-test="login-button">
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login

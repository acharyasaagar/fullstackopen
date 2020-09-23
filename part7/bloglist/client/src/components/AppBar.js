import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'

import { setUserAction } from '../store/actions'

const User = props => {
  const { user } = props

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUserAction(null))
  }

  return (
    <div className="v-flex">
      <p className="subtitle">
        <span role="img" aria-label="user emoji">
          👤&nbsp;&nbsp;
        </span>
        Logged in as: <span className="title"> {user.username}</span>
      </p>
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User

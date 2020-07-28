import React from 'react'

const User = props => {
  const { user, handleLogout } = props
  return (
    <div className="flex panel">
      <p className="subtitle">
        <span role="img" aria-label="user emoji">
          👤&nbsp;&nbsp;
        </span>
        Logged in as: <span className="title"> {user.username}</span>
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default User

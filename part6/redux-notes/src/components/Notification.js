import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const { notifications } = props
  const style = {
    margin: '4px auto 0 auto',
    position: 'realtive',
    top: '-50vh',
    right: '0',
    background: 'blue',
    color: 'white',
    padding: 12,
  }

  return (
    <>
      {notifications.map((notification, idx) => (
        <div style={style} key={`${notification}-${idx}`}>
          {notification}
        </div>
      ))}
    </>
  )
}

const mapState = state => ({
  notifications: state.notifications,
})

export default connect(mapState)(Notification)

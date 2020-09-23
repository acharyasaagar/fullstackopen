import React from 'react'
import { useSelector } from 'react-redux'

const Notifications = props => {
  const notifications = useSelector(state => state.notifications)
  return (
    <>
      {notifications.map((notification, idx) => {
        return (
          <Notification
            notification={notification}
            key={`${notification}-${idx}`}
          />
        )
      })}
    </>
  )
}

const Notification = props => {
  const { notification } = props
  return (
    <div className={notification.type}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notifications

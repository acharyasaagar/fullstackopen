import React from 'react'

const Notification = props => {
  const { message } = props
  const notificationStyle = {
    margin: 8,
    padding: '8px 10px 12px 10px',
    color: '#281713',
    fontSize: 16,
    fontFamily: 'Arial sans-serif',
    border: '3px solid #C40000',
    borderRadius: 4,
    background: '#D7BDBB',
  }
  if (message === null) {
    return null
  }
  return <div style={notificationStyle}>{message}</div>
}

export default Notification

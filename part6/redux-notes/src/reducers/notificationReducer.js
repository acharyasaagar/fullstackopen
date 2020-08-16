const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...action.data]
    default:
      return state
  }
}

export default notificationReducer

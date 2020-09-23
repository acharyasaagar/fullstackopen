import { PUSH_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/action-types'

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case PUSH_NOTIFICATION:
      return state.concat(action.data)
    case REMOVE_NOTIFICATION:
      return state.filter(n => n.id !== action.data.id)
    default:
      return state
  }
}

export default notificationsReducer

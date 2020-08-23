import { DESTROY_USERS, INIT_USERS } from '../actions/action-types'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_USERS:
      return state.concat(action.data)
    case DESTROY_USERS:
      return []
    default:
      return state
  }
}

export default usersReducer

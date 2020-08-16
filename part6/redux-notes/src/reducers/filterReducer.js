const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export default filterReducer

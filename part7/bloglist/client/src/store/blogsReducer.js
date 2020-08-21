const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return [...action.payload]
    default:
      return state
  }
}

export default blogsReducer

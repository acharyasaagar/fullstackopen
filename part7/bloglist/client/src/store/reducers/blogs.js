const blogsReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return [...action.data]
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    default:
      return state
  }
}

export default blogsReducer

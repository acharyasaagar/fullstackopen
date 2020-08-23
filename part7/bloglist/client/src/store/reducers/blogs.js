import {
  ADD_BLOG,
  DELETE_BLOG,
  INIT_BLOGS,
  LIKE_BLOG,
} from '../actions/action-types'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return [...action.data]
    case ADD_BLOG:
      return state.concat(action.data)
    case LIKE_BLOG:
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    case DELETE_BLOG:
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export default blogsReducer

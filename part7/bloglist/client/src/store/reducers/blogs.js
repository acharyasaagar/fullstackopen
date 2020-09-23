import {
  ADD_BLOG,
  DELETE_BLOG,
  INIT_BLOGS,
  UPDATE_BLOG,
} from '../actions/action-types'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return [...action.data]
    case ADD_BLOG:
      return state.concat(action.data)
    case DELETE_BLOG:
      return state.filter(blog => blog.id !== action.data.id)
    case UPDATE_BLOG:
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    default:
      return state
  }
}

export default blogsReducer

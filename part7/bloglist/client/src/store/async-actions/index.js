import blogService from '../../services/blog'
import authService from '../../services/auth'

import {
  initBlogsAction,
  addBlogAction,
  likeBlogAction,
  deleteBlogAction,
  setUserAction,
} from '../actions'

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = (await blogService.getAll()).data
      return dispatch(initBlogsAction(blogs))
    } catch (err) {
      console.log(err)
    }
    return null
  }
}

export const addBlog = blog => {
  return async dispatch => {
    try {
      const savedBlog = (await blogService.create(blog)).data
      return dispatch(addBlogAction(savedBlog))
    } catch (err) {
      console.log(err)
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const likedBlog = (await blogService.like(blog)).data
      return dispatch(likeBlogAction(likedBlog))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      const deletedBlog = await blogService.remove(blog)
      if (deletedBlog.status === 204) {
        return dispatch(deleteBlogAction(blog))
      }
      throw new Error('Error deleting blog')
    } catch (err) {
      console.log(err)
    }
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = (await authService.login(credentials)).data
      dispatch(setUserAction(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (err) {
      window.localStorage.removeItem('loggedUser')
      dispatch(setUserAction(null))
    }
  }
}

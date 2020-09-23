import authService from '../../services/auth'
import blogService from '../../services/blog'
import usersService from '../../services/users'

import {
  addBlogAction,
  addCommentAction,
  deleteBlogAction,
  initBlogsAction,
  initUsersAction,
  likeBlogAction,
  pushNotificationAction,
  removeNotificationAction,
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
      dispatch(addBlogAction(savedBlog))
      return dispatch(
        setNotifications({
          message: 'Blog Created Successfully!',
          type: 'success',
        })
      )
    } catch (err) {
      return dispatch(setNotifications({ message: err.message, type: 'error' }))
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
        dispatch(deleteBlogAction(blog))
        return dispatch(
          setNotifications({
            message: 'Blog Deleted Successfully!',
            type: 'success',
          })
        )
      }
      throw new Error('Error deleting blog')
    } catch (err) {
      console.log(err)
      return dispatch(
        setNotifications({ message: err.message, type: 'success' })
      )
    }
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    try {
      const commentAdded = await blogService.comment(comment, blog)
      if (commentAdded.status === 201) {
        dispatch(addCommentAction(commentAdded.data))
        return dispatch(
          setNotifications({
            message: 'Comment Added Successfully!',
            type: 'success',
          })
        )
      }
      throw new Error('Error deleting blog')
    } catch (err) {
      console.log(err)
      return dispatch(
        setNotifications({ message: err.message, type: 'success' })
      )
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

export const setNotifications = notification => {
  return dispatch => {
    try {
      const now = Date.now()
      const random = Math.floor(Math.random() * 10000)
      const id = (now * random).toString(16)
      const payload = { ...notification, id }
      dispatch(pushNotificationAction(payload))
      setTimeout(() => dispatch(removeNotificationAction(payload)), 3000)
    } catch (err) {
      dispatch(setNotifications({ message: 'Error occured', type: 'error' }))
    }
  }
}

export const initUsers = () => {
  return async dispatch => {
    try {
      const users = (await usersService.getAll()).data
      dispatch(initUsersAction(users))
    } catch (err) {
      dispatch(
        setNotifications({ message: 'Error fetching users', type: 'error' })
      )
    }
  }
}

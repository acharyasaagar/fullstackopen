import {
  ADD_BLOG,
  DELETE_BLOG,
  DESTROY_USERS,
  INIT_BLOGS,
  INIT_USERS,
  PUSH_NOTIFICATION,
  SET_USER,
  REMOVE_NOTIFICATION,
  UPDATE_BLOG,
} from './action-types'

export const initBlogsAction = blogs => ({
  type: INIT_BLOGS,
  data: blogs,
})

export const addBlogAction = blog => ({
  type: ADD_BLOG,
  data: blog,
})

export const likeBlogAction = blog => ({
  type: UPDATE_BLOG,
  data: blog,
})

export const deleteBlogAction = blog => ({
  type: DELETE_BLOG,
  data: blog,
})

export const addCommentAction = blog => ({
  type: UPDATE_BLOG,
  data: blog,
})

export const setUserAction = user => ({
  type: SET_USER,
  data: user,
})

export const pushNotificationAction = notification => ({
  type: PUSH_NOTIFICATION,
  data: notification,
})

export const removeNotificationAction = notification => ({
  type: REMOVE_NOTIFICATION,
  data: notification,
})

export const initUsersAction = users => ({
  type: INIT_USERS,
  data: users,
})

export const destroyUsersAction = users => ({
  type: DESTROY_USERS,
})

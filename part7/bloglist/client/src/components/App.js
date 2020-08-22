import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notification from './Notification'
import User from './User'

import Toggleable from './Toggleable'

import { initBlogs } from '../store/async-actions'
import { setUserAction } from '../store/actions'

const App = () => {
  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

  const checkLoggedUser = () => {
    const user = JSON.parse(window.localStorage.loggedUser || null)
    dispatch(setUserAction(user))
  }

  const populateBlogs = () => {
    dispatch(initBlogs())
  }

  useEffect(populateBlogs, [])
  useEffect(checkLoggedUser, [])

  const blogFormRef = useRef()

  const loginForm = () => (
    <Toggleable actionButtonLabel="log in" cancelButtonLabel="cancel">
      <Login />
    </Toggleable>
  )

  const showUser = user => <User user={user} />

  return (
    <>
      <Notification err={err} success={success} />
      {user === null ? loginForm() : showUser(user)}
      <br></br>
      <br></br>
      {user && (
        <>
          <h2>
            <span role="img" aria-label="blog emoji">
              📋&nbsp;&nbsp;
            </span>
            Blogs
          </h2>
          <br></br>
          <br></br>
          <Toggleable
            actionButtonLabel="Create a new blog"
            cancelButtonLabel="close &nbsp;&nbsp;✖️"
            ref={blogFormRef}
          >
            <CreateBlog setSuccess={setSuccess} />
          </Toggleable>
          <div id="blogs">
            {sortedBlogs.map(blog => (
              <Blog blog={blog} key={blog.id} user={user} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App

import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notification from './Notification'
import User from './User'

import blogService from '../services/blog'
import Toggleable from './Toggleable'

import { initBlogs } from '../store/async-actions'

const App = () => {
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState(null)

  const dispatch = useDispatch()

  const setBlogs = () => 'blog'

  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

  const checkLoggedUser = () => {
    const user = window.localStorage.getItem('loggedUser')
    setUser(JSON.parse(user))
  }
  const populateBlogs = () => {
    dispatch(initBlogs())
  }
  const createBlog = async blog => {
    try {
      const { data } = await blogService.create(blog)
      setBlogs(blogs.concat(data))
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      throw new Error('Error creating blog')
    }
  }

  useEffect(populateBlogs, [])
  useEffect(checkLoggedUser, [])

  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <Toggleable actionButtonLabel="log in" cancelButtonLabel="cancel">
      <Login setUser={setUser} />
    </Toggleable>
  )

  const showUser = user => <User user={user} handleLogout={handleLogout} />

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
            <CreateBlog createBlog={createBlog} setSuccess={setSuccess} />
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

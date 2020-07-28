import React, { useState, useEffect, useRef } from 'react'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notification from './Notification'
import User from './User'

import blogService from '../services/blog'
import Toggleable from './Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)

  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

  const checkLoggedUser = () => {
    const user = window.localStorage.getItem('loggedUser')
    setUser(JSON.parse(user))
  }
  const populateBlogs = () => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs([...blogs.data])
    }
    getBlogs()
  }

  const createBlog = async blog => {
    try {
      const { data } = await blogService.create(blog)
      setBlogs(blogs.concat(data))
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      console.log(err)
      setErr({ message: 'Error liking blog' })
      setTimeout(() => setErr(null), 5000)
    }
  }

  const updateBlog = async (updatedBlog, blogId) => {
    try {
      const { data } = await blogService.update(updatedBlog, blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId).concat(data))
    } catch (err) {
      console.log(err)
      setErr({ message: 'Error liking blog' })
      setTimeout(() => setErr(null), 5000)
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
    <Toggleable buttonLabel="log in" showButton={true} showCancelButton={true}>
      <Login setUser={setUser} />
    </Toggleable>
  )

  const showUser = user => <User user={user} handleLogout={handleLogout} />

  return (
    <>
      <Notification err={err} />
      {user === null ? loginForm() : showUser(user)}
      <br></br>
      <br></br>
      {user === null ? (
        ''
      ) : (
        <>
          <h2>
            <span role="img" aria-label="blog emoji">
              📋&nbsp;&nbsp;
            </span>
            Blogs
          </h2>
          <br></br>
          <br></br>
          <div className="panel">
            <Toggleable
              buttonLabel="Create a new blog"
              showButton={true}
              showCancelButton={true}
              ref={blogFormRef}
            >
              <CreateBlog createBlog={createBlog} />
            </Toggleable>
          </div>

          {sortedBlogs.map(blog => (
            <Blog blog={blog} updateBlog={updateBlog} key={blog.id} />
          ))}
        </>
      )}
    </>
  )
}

export default App

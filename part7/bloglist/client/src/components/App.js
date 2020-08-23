import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notifications from './Notification'
import User from './User'
import Users from './Users'

import Toggleable from './Toggleable'

import { initBlogs } from '../store/async-actions'
import { setUserAction } from '../store/actions'

const App = () => {
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
      <Notifications />
      {user === null ? loginForm() : ''}
      {user && (
        <Router>
          <div className="flex panel">
            <div className="flex">
              <Link to="/">Home</Link>
              <Link to="/users">Users</Link>
              <Link to="/create-blog">Create blog</Link>
            </div>
            <User user={user} />
          </div>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/create-blog">
              <div className="panel center">
                <CreateBlog />
              </div>
            </Route>
            <Route path="/">
              <div id="blogs">
                <br></br>
                <br></br>
                <h2>
                  <span role="img" aria-label="blog emoji">
                    📋&nbsp;&nbsp;
                  </span>
                  All Blogs
                </h2>
                {sortedBlogs.map(blog => (
                  <Blog blog={blog} key={blog.id} user={user} />
                ))}
              </div>
            </Route>
          </Switch>
        </Router>
      )}
    </>
  )
}

export default App

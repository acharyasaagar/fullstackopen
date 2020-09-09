import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import AppBar from './AppBar'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notifications from './Notification'
import Users from './Users'
import User from './User'

import Toggleable from './Toggleable'

import { initBlogs } from '../store/async-actions'
import { initUsers } from '../store/async-actions'
import { destroyUsersAction } from '../store/actions'
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
  const fetchUsers = () => {
    dispatch(initUsers())
    return () => dispatch(destroyUsersAction())
  }

  useEffect(populateBlogs, [])
  useEffect(checkLoggedUser, [])
  useEffect(fetchUsers, [dispatch])

  const loginForm = () => (
    <Toggleable actionButtonLabel="log in" cancelButtonLabel="cancel">
      <Login />
    </Toggleable>
  )

  return (
    <>
      <Notifications />
      {user === null ? loginForm() : ''}
      {user && (
        <Router>
          <div className="flex panel">
            <div className="flex">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/users" className="nav-link">
                Users
              </Link>
              <Link to="/create-blog" className="nav-link">
                Create blog
              </Link>
            </div>
            <AppBar user={user} />
          </div>
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
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

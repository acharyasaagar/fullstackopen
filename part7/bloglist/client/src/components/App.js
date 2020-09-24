import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from 'react-router-dom'

import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core'

import AppNavBar from './AppNavBar'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Login from './Login'
import Notifications from './Notification'
import Users from './Users'
import User from './User'

import { initBlogs } from '../store/async-actions'
import { initUsers } from '../store/async-actions'
import { destroyUsersAction } from '../store/actions'
import { setUserAction } from '../store/actions'

const useStyles = makeStyles({
  '.MuiLink-root': {
    padding: '0.6em',
  },
})

const App = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

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

  return (
    <>
      <Notifications />
      {user === null ? <Login /> : ''}
      {user && (
        <Router>
          <AppNavBar user={user} />
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
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <div id="blogs">
                <h2>All Blogs</h2>
                {sortedBlogs.map(blog => (
                  <div key={`${blog.id}`} className={classes['.MuiLink-root']}>
                    <Link component={RouterLink} to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </div>
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

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initUsers } from '../store/async-actions'
import { destroyUsersAction } from '../store/actions'

const Users = props => {
  const dispatch = useDispatch()
  const fetchUsers = () => {
    dispatch(initUsers())
    return () => dispatch(destroyUsersAction())
  }

  useEffect(fetchUsers, [dispatch])
  const users = useSelector(state => state.users)
  return (
    <div className="panel">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

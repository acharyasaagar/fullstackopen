import React from 'react'
import { useSelector } from 'react-redux'

const Users = props => {
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
              <td>
                <a href={`/users/${user.id}`}> {user.username}</a>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

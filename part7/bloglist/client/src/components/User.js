import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = props => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(u => u.id === id))
  if (!user) {
    return <h5>loading user</h5>
  }
  return (
    <div>
      <br></br>
      <h2>{user.name}</h2>
      <br></br>
      <p>
        <strong>Added Blogs:</strong>
      </p>
      <br></br>
      {user?.blogs?.length === 0 ? (
        <p>{`${user.name} had not added any blogs yet!`}</p>
      ) : (
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User

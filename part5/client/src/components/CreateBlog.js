import React, { useState } from 'react'

import Notification from './Notification'

const CreateBlog = props => {
  const { createBlog } = props
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleAddBlog = async e => {
    e.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }
    try {
      await createBlog(newBlog)
      setTitle('')
      setUrl('')
      setAuthor('')
      setSuccess({ message: 'New Blog Created' })
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      console.log(err.message)
      setErr({ message: err.message })
      setTimeout(() => setErr(null), 5000)
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleUrlChange = e => {
    setUrl(e.target.value)
  }

  const handleAuthorChange = e => {
    setAuthor(e.target.value)
  }

  return (
    <div>
      <Notification err={err} success={success} />
      <h4>
        Create Blog
        <span role="img" aria-label="user emoji">
          &nbsp;&nbsp;📝
        </span>
      </h4>
      <form onSubmit={handleAddBlog}>
        <section>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </section>
        <section>
          <label htmlFor="url">Blog URL: </label>
          <input
            value={url}
            type="text"
            name="url"
            onChange={handleUrlChange}
          />
        </section>
        <section>
          <label htmlFor="author">Author: </label>
          <input
            value={author}
            type="text"
            name="author"
            onChange={handleAuthorChange}
          />
        </section>
        <button type="submit">
          add blog
          <span role="img" aria-label="user emoji">
            &nbsp;&nbsp;➕
          </span>
        </button>
      </form>
    </div>
  )
}

export default CreateBlog

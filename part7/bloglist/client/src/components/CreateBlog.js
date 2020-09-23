import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addBlog } from '../store/async-actions'

const CreateBlog = props => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const handleAddBlog = async e => {
    e.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }
    try {
      dispatch(addBlog(newBlog))
      setTitle('')
      setUrl('')
      setAuthor('')
      history.push('/')
    } catch (err) {
      console.log(err.message)
      setTitle('')
      setUrl('')
      setAuthor('')
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
      <h4>
        Create Blog
        <span role="img" aria-label="user emoji">
          &nbsp;&nbsp;📝
        </span>
      </h4>
      <form onSubmit={handleAddBlog} data-test="create-blog-form">
        <section>
          <label htmlFor="title">Blog Title:</label>
          <input
            data-test="blog-title-input"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </section>
        <section>
          <label htmlFor="url">Blog URL: </label>
          <input
            data-test="blog-url-input"
            value={url}
            type="text"
            name="url"
            onChange={handleUrlChange}
          />
        </section>
        <section>
          <label htmlFor="author">Author: </label>
          <input
            data-test="blog-author-input"
            value={author}
            type="text"
            name="author"
            onChange={handleAuthorChange}
          />
        </section>
        <button type="submit" data-test="blog-add-button">
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

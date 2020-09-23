import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { likeBlog, deleteBlog, addComment } from '../store/async-actions'
import Comments from './Comments'

const Blog = () => {
  const [comment, setComment] = useState('')

  const { id } = useParams()

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLikeBlog = blog => {
    return e => {
      e.target.blur()
      dispatch(likeBlog(blog))
    }
  }

  const handleDeleteBlog = blog => {
    return e => {
      const confirmed = window.confirm(`Remove blog: ${blog.title}`)
      if (confirmed) dispatch(deleteBlog(blog))
    }
  }

  const handleAddComment = blog => {
    return e => {
      e.preventDefault()
      dispatch(addComment({ comment }, blog))
      setComment('')
    }
  }

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <div className="panel blog" id={`${blog.id}`}>
        <section className="flex">
          <div>
            <p className="title">{blog.title}</p>
            <p className="url">
              <span role="img" aria-label="blog link">
                &#128279;&nbsp;
              </span>
              <a href={blog.url}>{blog.url}</a>
            </p>
            <p className="subtitle">
              <span> {blog.author} </span>
              <button
                className="meta"
                data-test="like-blog-button"
                onClick={handleLikeBlog(blog)}
              >
                <span role="img" aria-label="blog link">
                  &nbsp;&nbsp;&#128420;&nbsp;&nbsp;
                </span>
                {blog.likes ? blog.likes : 0} likes
              </button>
            </p>
          </div>
          <div className="v-flex">
            {blog.user && user.id === blog.user.id ? (
              <button
                data-test="delete-blog-button"
                onClick={handleDeleteBlog(blog)}
              >
                delete
                <span role="img" aria-label="blog delete">
                  &nbsp;&nbsp;&nbsp;🗑
                </span>
              </button>
            ) : (
              ''
            )}
          </div>
        </section>
        <section className="v-flex">
          <Comments
            comment={comment}
            addComment={handleAddComment(blog)}
            comments={blog.comments}
            handleCommentChange={handleCommentChange}
          />
        </section>
      </div>
    </>
  )
}

export default Blog

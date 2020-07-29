import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'

import Toggleable from './Toggleable'

const Blog = props => {
  const { blog, deleteBlog, updateBlog, user } = props
  const [blogExpanded, setBlogExpanded] = useState(false)
  const blogRef = useRef()

  const handleToggle = () => {
    setBlogExpanded(!blogExpanded)
    blogRef.current.toggleVisibility()
  }

  const handleLikeBlog = blogId => {
    return async e => {
      e.target.blur()
      const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      delete updatedBlog.id
      await updateBlog(updatedBlog, blogId)
    }
  }

  const handleDeleteBlog = blog => {
    return async () => {
      const confirmed = window.confirm(`Remove blog: ${blog.title}`)
      if (confirmed) await deleteBlog(blog.id)
    }
  }

  return (
    <>
      <div className="panel">
        <div
          className={` ${blogExpanded ? 'd-none' : 'flex'}`}
          data-test="blog-preview"
        >
          <h3 className="title" data-test="blog-preview-title">
            {blog.title}
          </h3>
          <button onClick={handleToggle} data-test="view-blog-button">
            view blog
            <span role="img" aria-label="blog link">
              &nbsp;🔻
            </span>
          </button>
        </div>
        <Toggleable ref={blogRef}>
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
                  onClick={handleLikeBlog(blog.id)}
                >
                  <span role="img" aria-label="blog link">
                    &nbsp;&nbsp;&#128420;&nbsp;&nbsp;
                  </span>
                  {blog.likes ? blog.likes : 0} likes
                </button>
              </p>
            </div>
            <div className="v-flex">
              <button onClick={handleToggle} data-test="hide-blog-button">
                hide blog
                <span role="img" aria-label="blog link">
                  &nbsp;&#128314;
                </span>
              </button>
              {user.id === blog.user.id ? (
                <button onClick={handleDeleteBlog(blog)}>
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
        </Toggleable>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog

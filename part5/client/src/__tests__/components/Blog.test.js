import React from 'react'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Blog from '../../components/Blog'

describe('<Blog /> component', () => {
  let blogComponent
  let deleteBlog
  let updateBlog
  let user
  let blog

  beforeEach(() => {
    deleteBlog = jest.fn()
    updateBlog = jest.fn()

    user = {
      id: 1,
      name: 'Mary Jane',
      username: 'mjane',
    }

    blog = {
      title: 'Blog title lorem',
      author: 'John Doe',
      url: 'https://mde.com/kipsum',
      likes: 99,
      user: user,
    }
    blogComponent = render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
        updateBlog={updateBlog}
      />
    )
  })

  it('should render blog title', () => {
    const blogPreviewDiv = blogComponent.container.querySelector(
      '[data-test="blog-preview"]'
    )
    expect(blogPreviewDiv).toHaveClass('flex')
    const blogPreviewTitle = blogPreviewDiv.querySelector(
      '[data-test="blog-preview-title"]'
    )
    expect(blogPreviewTitle).toHaveTextContent(blog.title)
  })

  it('should not render other blog info by default', () => {
    const togglableContentDiv = blogComponent.container.querySelector(
      '[data-test="togglable-content"]'
    )
    expect(togglableContentDiv).toHaveStyle('display: none')
  })

  it('should render all blog info when "view blog" button is clicked', () => {
    const viewBlogButton = blogComponent.container.querySelector(
      '[data-test="view-blog-button"]'
    )

    fireEvent.click(viewBlogButton)

    const togglableContentDiv = blogComponent.container.querySelector(
      '[data-test="togglable-content"]'
    )
    expect(togglableContentDiv).toHaveStyle('display: block')
  })

  it('should call updateBlog twice when like button is clicked twice', () => {
    const likeBlogButton = blogComponent.container.querySelector(
      '[data-test="like-blog-button"]'
    )
    fireEvent.click(likeBlogButton)
    expect(updateBlog.mock.calls).toHaveLength(1)

    fireEvent.click(likeBlogButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})

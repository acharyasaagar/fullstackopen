export const initBlogsAction = blogs => ({
  type: 'INIT_BLOGS',
  data: blogs,
})

export const addBlogAction = blog => ({
  type: 'ADD_BLOG',
  data: blog,
})

export const likeBlogAction = blog => ({
  type: 'LIKE_BLOG',
  data: blog,
})

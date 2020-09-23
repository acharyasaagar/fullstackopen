const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const factory = require('./factory')
const Blog = require('../models/blog')

const blogFactory = factory('blog')
const commentFactory = factory('comment')

const api = supertest(app)

// should add the comment to the blog
// People need not be authenticated to add a comment
// Comment is associated with a blog post
// invalid id returns an error

const blogs = blogFactory(2)
describe('Comments API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of blogs) {
      await new Blog(blog).save()
    }
  })
  it('should throw an error, when blog id is invalid', async () => {
    const [newComment] = commentFactory()
    await api
      .post(`/api/blogs/somegibberishidhere/comments`)
      .send(newComment)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  it('should add the comment to the blog, when blog id is valid', async () => {
    const [newComment] = commentFactory()
    const { body } = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const [randomBlog] = body
    const blogId = randomBlog.id
    randomBlog.comments = [newComment]
    await api
      .post(`/api/blogs/${blogId}/comments`)
      .send(randomBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsResponse = await api.get('/api/blogs')
    const blogWithNewComment = blogsResponse.body.find(b => b.id === blogId)
    expect(blogWithNewComment.comments).toContain(newComment)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

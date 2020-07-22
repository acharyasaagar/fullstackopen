const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of blogs) {
    await new Blog(blog).save()
  }
})

describe('Blogs Api', () => {
  it('should return all the blogs in database as json objects', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const receivedBlogs = response.body
    expect(receivedBlogs).toHaveLength(blogs.length)
  })

  it('should verify the uniq id of blog posts is "id"', async () => {
    const response = await api.get('/api/blogs').expect(200)
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })

  it('should verify a post request creates a new blog post in database', async () => {
    const newBlog = {
      title: 'How to do stuff',
      author: 'Sagar Acharya',
      url: 'https://sagar.dev',
      likes: 89,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogsInDb = await Blog.find({})
    const blogTitles = newBlogsInDb.map(blog => blog.title)
    expect(newBlogsInDb).toHaveLength(blogs.length + 1)
    expect(blogTitles).toContain(newBlog.title)
  })

  it('should verify creating a blog without passing likes should create blog with likes 0', async () => {
    const newBlog = {
      title: 'How to do stuff',
      author: 'Sagar Acharya',
      url: 'https://sagar.dev',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  it('should verify missing "title" when creating a new blog fails with 400 and blog is not created in db', async () => {
    const newBlog = {
      author: 'Sagar Acharya',
      url: 'https://sagar.dev',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsInDb = await Blog.find({})
    expect(blogsInDb).toHaveLength(blogs.length)
  })

  it('should verify missing "url" when creating a new blog fails with 400 and blog is not created in db', async () => {
    const newBlog = {
      title: 'Jest and Test',
      author: 'Sagar Acharya',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsInDb = await Blog.find({})
    expect(blogsInDb).toHaveLength(blogs.length)
  })

  it('should delete the blog if valid id is provided', async () => {
    const newBlog = {
      title: 'How to do stuff',
      author: 'Sagar Acharya',
      url: 'https://sagar.dev',
    }
    const { _id: id } = await new Blog(newBlog).save()
    const newBlogs = await Blog.find({})
    expect(newBlogs).toHaveLength(blogs.length + 1)
    await api.delete(`/api/blogs/${id}`).expect(204)
    const updatedBlogs = await Blog.find({})
    expect(updatedBlogs).toHaveLength(blogs.length)
  })

  it('should fail with 500 if id is not valid', async () => {
    const id = 'gibberish-id-here'
    await api.delete(`/api/blogs/${id}`).expect(500)
    const blogsInDb = await Blog.find({})
    expect(blogsInDb).toHaveLength(blogs.length)
  })
})

describe('Updating blogs', () => {
  it('should update the blog when valid payload and valid id is given', async () => {
    const payload = {
      title: 'How to do stuff updated',
      author: 'Sagar Acharya And Deepmala Shrestha',
      url: 'https://sagar.dev/blogs',
    }
    const { _id: id } = await new Blog({
      title: 'gib title',
      url: 'gibb url',
      author: 'who',
    }).save()
    await api.put(`/api/blogs/${id}`).send(payload).expect(200)
  })

  it('should not update the blog when invalid id is given', async () => {
    const payload = {}
    await api.put(`/api/blogs/gibberish-id-here`).send(payload).expect(500)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

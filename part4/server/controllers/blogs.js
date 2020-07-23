const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const user = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  try {
    return res.json(
      await Blog.find({}).populate('user', { id: 1, name: 1, username: 1 })
    )
  } catch (err) {
    return res.status(400).send({ err: 'error occured' })
  }
})

blogsRouter.post('/', async (req, res) => {
  try {
    const users = await User.find({})
    const randomUser = users[0]
    const { title, author, likes, url } = req.body
    const newBlog = {
      title,
      author,
      likes: likes || 0,
      url,
      user: randomUser._id,
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    await randomUser.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    return res.status(400).send({ err: 'error occured' })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).send({ err: 'server error occured' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      context: 'query',
    })
    return res.json(updated)
  } catch (err) {
    return res.status(500).send({ err: 'server error occured' })
  }
})
module.exports = blogsRouter

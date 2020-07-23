const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const { JWT_SECRET } = require('../utils/constants')

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
  const decodedToken = req.token
    ? await jwt.verify(req.token, JWT_SECRET)
    : null
  if (!(req.token && decodedToken)) {
    return res.status(401).send({ err: 'Unauthorized' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res
      .status(404)
      .send({ err: 'non-existing user can not create a blog' })
  }
  const { title, author, likes, url } = req.body
  const newBlog = {
    title,
    author,
    likes: likes || 0,
    url,
    user: user._id,
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
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

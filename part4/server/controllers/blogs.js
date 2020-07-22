const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  try {
    return res.json(await Blog.find({}))
  } catch (err) {
    return res.status(400).send({ err: 'error occured' })
  }
})

blogsRouter.post('/', async (req, res) => {
  try {
    const { title, author, likes, url } = req.body
    const newBlog = {
      title,
      author,
      likes: likes || 0,
      url,
    }
    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
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

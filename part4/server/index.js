const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const { PORT, MONGODB_URI } = require('./utils/constants')
const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('Mongo connected'))
  .catch(err => console.log('mongo not connected'))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

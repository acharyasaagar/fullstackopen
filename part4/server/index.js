const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blog')

const { PORT, MONGODB_URI } = require('./utils/constants')
const app = express()

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('Mongo connected'))
  .catch(err => console.log('mongo not connected'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

/** Models */
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

/** Custom Middlewares */
const requestLogger = require('./middlewares/requestLogger')

/** Utils */
const logger = require('./utils/logger')
const { MONGODB_URI } = require('./utils/constants')

/** ----------------------------------------------- */
const app = express()

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(result => logger.info('Mongo connected'))
  .catch(err => logger.error('mongo not connected'))

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app

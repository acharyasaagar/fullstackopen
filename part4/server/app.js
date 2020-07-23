const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')

/** Models */
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

/** Custom Middlewares */
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')
const tokenDecoder = require('./middlewares/tokenDecoder')
const tokenExtractor = require('./middlewares/tokenExtractor')

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
    useCreateIndex: true,
  })
  .then(result => logger.info('Mongo connected'))
  .catch(err => logger.error('mongo not connected'))

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
// app.use(tokenDecoder)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app

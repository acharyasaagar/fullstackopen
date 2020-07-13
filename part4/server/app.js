const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

/** Models */
const blogRouter = require('./controllers/blog')

/** Custom Middlewares */
const requestLogger = require('./middlewares/requestLogger')

/** Utils */
const { MONGODB_URI } = require('./utils/constants')

/** ----------------------------------------------- */
const app = express()

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('Mongo connected'))
  .catch(err => console.log('mongo not connected'))

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

module.exports = app

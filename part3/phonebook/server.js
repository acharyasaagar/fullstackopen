require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const Person = require('./models/person')
const CustomError = require('./errors/custom-error')
const errorHanlder = require('./errors/handler')

const port = process.env.PORT || 8080
const mongooseUrl = process.env.MONGODB_URI

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/** Morgan configuration */
// eslint-disable-next-line
morgan.token('body', (req, res) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' '
)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (req, res, next) => {
  return Person.find({})
    .then(persons => {
      const responseHtml = `
      Phonebook has information for ${persons.length} people.
      ${new Date()}
    `
      return res.send(responseHtml)
    })
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  return Person.find({})
    .then(persons => {
      if (persons.length < 1) throw new CustomError('NotFound')
      return res.json(persons)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const newPerson = new Person({
    name,
    number,
  })
  return newPerson
    .save()
    .then(person => res.json(person))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  return Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person)
      throw new CustomError('NotFound')
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  return Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(result => {
      if (result === null) throw new CustomError('NotFound')
      return res.json(result)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  return (
    Person.findByIdAndRemove(req.params.id)
      // eslint-disable-next-line
      .then(result => res.status(204).end())
      .catch(err => next(err))
  )
})

app.use(errorHanlder)

mongoose
  .connect(mongooseUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line
  .then(connection => {
    console.log('\n', 'MongoDB connected')
    app.listen(port, () => console.log(' Server started at port', port, '\n'))
  })
  .catch(err => {
    console.log('\nMongoDB connection failed')
    console.log(err)
  })

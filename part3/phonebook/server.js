const cors = require('cors')
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const personsJsonPath = path.join(__dirname, '/persons.json')
const idSeqPath = path.join(__dirname, '/id_seq.txt')

const persons = JSON.parse(fs.readFileSync(personsJsonPath, 'utf-8'))

const getNextPersonId = () => Number(fs.readFileSync(idSeqPath, 'utf-8'))

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/** Morgan configuration */
morgan.token('body', (req, res) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' '
)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (req, res) => {
  const responseHtml = `
    <p> Phonebook has information for ${persons.length} people. </p>
    <p> ${new Date()} </p>
  `
  return res.send(responseHtml)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const id = getNextPersonId()
  const { name, number } = req.body

  if (name && number) {
    const isNameUnique = !persons.find(p => p.name === name)
    if (isNameUnique) {
      const newPerson = {
        id,
        name,
        number,
      }
      const newPersons = JSON.stringify(persons.concat(newPerson))
      fs.writeFile(personsJsonPath, newPersons, (err, written) => {
        return res.status(201).json(newPerson)
      })
      return fs.writeFileSync(idSeqPath, id + 1)
    }
    return res.status(400).json({ error: 'name must be unique' })
  }
  return res.status(400).json({
    error:
      'Missing required properties. Both "name" and "number" are required.',
  })
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) return res.send(person)
  return res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const newPersons = persons.filter(p => p.id !== Number(req.params.id))
  const newPersonsStr = JSON.stringify(newPersons)
  fs.writeFile(personsJsonPath, newPersonsStr, (err, written) => {
    if (err) return res.status(500).end()
    return res.status(204).end()
  })
})

app.listen((port = 8080), () =>
  console.log('\n Server started at port', port, '\n')
)

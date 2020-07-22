const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  res.json(await User.find({}))
})

usersRouter.post('/', async (req, res) => {
  const { name, password: plainPassword, username } = req.body
  const password = await bcrypt.hash(plainPassword, 10)
  const user = new User({ name, password, username })
  const savedUser = await user.save()
  return res.status(201).json(savedUser)
})

module.exports = usersRouter

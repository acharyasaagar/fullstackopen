const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const userFactory = require('./userFactory')

const api = supertest(app)

const initialUserCount = 2

beforeEach(async () => {
  const fakeUsers = userFactory.getFakeUsers(initialUserCount)
  await User.deleteMany({})
  for (let fakeUser of fakeUsers) {
    const user = new User(fakeUser)
    await user.save()
  }
})

describe('Users api', () => {
  it('should retrieve all users as json', async () => {
    const { body } = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(body).toHaveLength(initialUserCount)
  })
})

describe('When creating a user', () => {
  it('should create a user when all values are valid', async () => {
    const usersBefore = await User.find({})
    expect(usersBefore).toHaveLength(initialUserCount)

    const newUser = {
      name: 'Poopy Pooperson',
      password: 'asjhflhKSFAH',
      username: 'pooperson',
    }

    const { body } = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(body.name).toBe(newUser.name)
    expect(body.username).toBe(newUser.username)
    expect(body.password).toBeUndefined()

    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(initialUserCount + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

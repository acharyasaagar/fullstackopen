const faker = require('faker')

const blogProducer = () => {
  const author = faker.name.findName()
  const likes = faker.random.number()
  const url = faker.internet.url()
  const title = faker.lorem.sentence()
  return { author, likes, url, title }
}

const userProducer = () => {
  const name = faker.name.findName()
  const username = faker.internet.userName()
  const password = faker.internet.password()
  return { name, username, password }
}

const commentProducer = () => {
  const randomNumber = Math.floor(Math.random() * 3)
  return faker.lorem.sentences(randomNumber)
}

module.exports = {
  blogProducer,
  commentProducer,
  userProducer,
}

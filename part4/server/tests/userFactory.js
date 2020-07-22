const faker = require('faker')

function getFakeUsers(n) {
  let fakeUsers = []
  for (let i = 0; i < n; i++) {
    const name = faker.name.findName()
    const username = faker.internet.userName()
    const password = faker.internet.password()
    fakeUsers = fakeUsers.concat({ name, password, username })
  }
  return fakeUsers
}

module.exports = {
  getFakeUsers,
}

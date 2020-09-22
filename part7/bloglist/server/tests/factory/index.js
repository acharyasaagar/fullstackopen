const { blogProducer, commentProducer, userProducer } = require('./producers')

const factoryBuilder = producer => {
  return function (n = 1) {
    return new Array(n).fill(0).map(_ => producer())
  }
}

const factory = factoryType => {
  switch (factoryType) {
    case 'blog':
      return factoryBuilder(blogProducer)
    case 'comment':
      return factoryBuilder(commentProducer)
    case 'user':
      return factoryBuilder(userProducer)
    default:
      return null
  }
}

module.exports = factory

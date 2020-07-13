const chalk = require('chalk')

exports.info = (...params) => {
  console.log(chalk.blue(...params))
}

exports.error = (...params) => {
  console.log(chalk.yellow(...params))
}

exports.log = (...params) => {
  console.log(...params)
}

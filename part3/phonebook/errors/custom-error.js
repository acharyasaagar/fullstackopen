function CustomError(name) {
  this.name = name

  switch (this.name) {
    case 'UniqueConstraintViolation':
      this.message = 'must be unique'
      break
    case 'RequiredConstraintViolation':
      this.message = 'all required properties should be passed'
      break
    case 'NotFound':
      this.message = 'requested resource was not found'
      break
    case 'ServerError':
      this.message = 'something went wrong in server'
      break
    default:
      this.message = 'An error occured'
      break
  }
}

module.exports = CustomError

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  username: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.password
  },
})

module.exports = mongoose.model('User', userSchema)

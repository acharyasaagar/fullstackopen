module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err.message)
  }

  switch (err.name) {
    case 'ValidationError':
      const errorMessage = err.message.split(/\sfailed:\s/)[1]
      return res.status(400).json({ err: errorMessage })
    default:
      return res.status(500).json({ err: 'Internal Server Error' })
  }
}

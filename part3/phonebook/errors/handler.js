module.exports = (err, req, res) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  }

  if (err.name === 'ServerError') {
    return res.status(500).send({ err: err.message })
  }

  return res.status(400).send({ err: err.message })
}

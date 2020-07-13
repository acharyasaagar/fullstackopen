module.exports = (req, res, next) => {
  const isBodyEmpty = Object.getOwnPropertyNames(req.body).length === 0
  console.log(
    `${req.method} ${req.url} ${isBodyEmpty ? '' : JSON.stringify(req.body)}`
  )
  next()
}

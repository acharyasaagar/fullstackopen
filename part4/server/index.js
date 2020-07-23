const http = require('http')
const mongoose = require('mongoose')

const app = require('./app')
const logger = require('./utils/logger')
const { PORT } = require('./utils/constants')

const server = http.createServer(app)
server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`))

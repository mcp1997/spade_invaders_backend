const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(logger)

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use('*', (req, res) => {
  res.json({ api: "up" })
})

module.exports = server
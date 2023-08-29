const router = require('express').Router()
const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

router.post('/register', (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  Users.insert({ username, password: hash })
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'something went wrong inside authRouter',
    stack: err.stack,
  })
})

module.exports = router
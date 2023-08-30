const router = require('express').Router()
const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const { verifyNewUser, verifyUserExists } = require('./auth-middleware')

const buildToken = user => {
  const payload = {
    subject: user.user_id,
    role_name: user.role_name,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

router.post('/register', verifyNewUser, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  Users.insert({ username, password: hash })
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.post('/login', verifyUserExists, (req, res, next) => {
  const { password } = req.body
  if(bcrypt.compareSync(password, req.user.password)) {
    const token = buildToken(req.user)
    res.json({
      message: `Welcome back, Cadet ${req.user.username}!`,
      token
    })
  } else {
    next({ status: 401, message: 'Invalid Credentials' })
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'something went wrong inside authRouter',
    stack: err.stack,
  })
})

module.exports = router
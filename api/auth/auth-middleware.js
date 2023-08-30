const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const verifyNewUser = (req, res, next) => {
  const { username, password } = req.body
  if(!username || !password) {
    next({ status: 422, message: 'Username and Password Required' })
  } else if(username.length < 4 || password.length < 4 ) {
    next({ status: 422, message: 'Username and Password must be longer than 4 characters' })
  } else {
    next()
  }
}

const verifyUserExists = (req, res, next) => {
  Users.findBy({ username: req.body.username })
    .then(user => {
      if(!user) {
        next({ status: 401, message: 'Invalid Credentials' })
      } else {
        req.user = user
        next()
      }
    })
    .catch(next)
}

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    return next({ status: 401, message: 'Invalid Token' })
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      next({ status: 401, message: 'Invalid Token' })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}

const only = role_name => (req, res, next) => {
  if(role_name === req.decodedToken.role_name) {
    next()
  } else {
    next({ status: 403, message: 'You are not authorized to view this content' })
  }
}

module.exports = { verifyNewUser, verifyUserExists, restricted, only }
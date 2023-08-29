const Users = require('../users/users-model')

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

module.exports = { verifyUserExists }
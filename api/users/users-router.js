const router = require('express').Router()
const Users = require('./users-model')

router.get('/', (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/:user_id', (req, res, next) => {
  Users.findById(req.params.user_id)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'something went wrong inside userRouter',
    stack: err.stack,
  })
})

module.exports = router
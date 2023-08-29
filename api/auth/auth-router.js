const router = require('express').Router()

router.post('/register', (req, res, next) => {
  res.json('register new user')
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'something went wrong inside authRouter',
    stack: err.stack,
  })
})

module.exports = router
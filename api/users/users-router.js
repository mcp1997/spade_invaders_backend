const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('get all users')
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'something went wrong inside userRouter',
    stack: err.stack,
  })
})

module.exports = router
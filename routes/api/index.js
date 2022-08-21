const router = require('express').Router();
const userRoutes = require('./users.js')
const authRoutes = require('./auth.js')
const postRoutes = require('./post.js')


//API routes
router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/post', postRoutes)

module.exports = router;
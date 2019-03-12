const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')

router.get('/:year/:month', UsersController.get_total_users)

module.exports = router

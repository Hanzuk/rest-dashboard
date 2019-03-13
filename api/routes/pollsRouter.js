const express = require('express')
const router = express.Router()

const PollsController = require('../controllers/polls')

router.get('/:year/:month', PollsController.get_general_poll)
router.get('/:year/:month/:about', PollsController.get_specific_poll)

module.exports = router

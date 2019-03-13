const express = require('express')
const router = express.Router()

const IncomesController = require('../controllers/incomes')

router.get('/:year/:month', IncomesController.get_total_incomes)
router.get('/:year/:month/:type', IncomesController.get_specific_income)

module.exports = router

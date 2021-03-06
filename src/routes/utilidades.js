const express = require('express')
const router = express.Router()
const moment = require('moment')

const Ingreso = require('../models/Ingreso')
const Gasto = require('../models/Gasto')

const yearQuery = req => {
	return {
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', parseInt(req.params.year))
					.startOf('year')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', parseInt(req.params.year))
					.endOf('year')
					.format()
			)
		}
	}
}
const monthQuery = req => {
	return {
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', parseInt(req.params.year))
					.set('month', parseInt(req.params.month) - 1)
					.startOf('month')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', parseInt(req.params.year))
					.set('month', parseInt(req.params.month) - 1)
					.endOf('month')
					.format()
			)
		}
	}
}

router.get('/periodo/:year', async (req, res) => {
	if (req.params.year.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	const income = await Ingreso.find(yearQuery(req))
		.sort({ date: 1 })
		.exec()

	const expense = await Gasto.find(yearQuery(req))
		.sort({ date: 1 })
		.exec()

	let utility = []
	for (let i = 0; i < income.length; i++) {
		utility.push({
			amount: income[i].amount - expense[i].amount,
			date: income[i].date
		})
	}
	res.status(200).send(utility)
})

router.get('/periodo/:year/:month', async (req, res) => {
	if (req.params.year.match(/[a-zA-Z]/g) || req.params.month.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	if (parseInt() < 1 || parseInt(req.params.month) > 12)
		return res.status(404).send({
			error: 'Something Happened'
		})

	const income = await Ingreso.find(monthQuery(req))
		.sort({ date: 1 })
		.exec()

	const expense = await Gasto.find(monthQuery(req))
		.sort({ date: 1 })
		.exec()

	await res.status(200).send({
		amount: income[0].amount - expense[0].amount,
		date: income[0].date
	})
})

module.exports = router

const express = require('express')
const router = express.Router()
const moment = require('moment')

const Gasto = require('../models/Gasto')

const response = (res, err, data) => {
	if (err) return res.status(404).send({ error: 'Something Happened' })

	if (data) {
		res.status(200).send(data)
	} else {
		res.status(404).send({ error: 'Something Happened' })
	}
}

router.get('/periodo/:year', async (req, res) => {
	let year = parseInt(req.params.year)

	if (req.params.year.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	await Gasto.find({
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', year)
					.startOf('year')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', year)
					.endOf('year')
					.format()
			)
		}
	})
		.sort({ date: 1 })
		.exec((err, data) => response(res, err, data))
})

router.get('/periodo/:year/:month', async (req, res) => {
	let year = parseInt(req.params.year),
		month = parseInt(req.params.month)

	if (req.params.year.match(/[a-zA-Z]/g) || req.params.month.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	if (month < 1 || month > 12)
		return res.status(404).send({
			error: 'Something Happened'
		})

	await Gasto.find({
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', year)
					.set('month', month - 1)
					.startOf('month')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', year)
					.set('month', month - 1)
					.endOf('month')
					.format()
			)
		}
	})
		.sort({ date: 1 })
		.exec((err, data) => response(res, err, data))
})

router.get('/sede/:headquarter', async (req, res) => {
	let headquarter = parseInt(req.params.headquarter)

	if (req.params.headquarter === 'all') {
		return await Gasto.find({
			headquarter: { $regex: '^sede', $options: 'im' }
		})
			.sort({ headquarter: 1 })
			.exec((err, data) => response(res, err, data))
	}

	if (req.params.headquarter.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	if (headquarter < 1)
		return res.status(404).send({
			error: 'Something Happened'
		})

	await Gasto.find({
		headquarter: { $regex: `${req.params.headquarter}$`, $options: 'im' }
	}).exec((err, data) => response(res, err, data))
})

module.exports = router

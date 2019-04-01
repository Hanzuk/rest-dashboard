const express = require('express')
const router = express.Router()
const moment = require('moment')

const Ingreso = require('../models/Ingreso')

const apiResponse = (req, res, err, data) => {
	if (err) {
		res.status(500).send({
			error: `☠️ Internal Server Error ${err.message}`
		})
	} else {
		if (data) {
			if (data.length > 0) {
				res.status(200).send(data)
			} else {
				res.status(404).send({
					error: '😭 Not found'
				})
			}
		} else {
			res.status(404).send({
				error: '☠️ Not found'
			})
		}
	}
}

router.get('/:year', async (req, res) => {
	await Ingreso.find({
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', req.params.year)
					.startOf('year')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', req.params.year)
					.endOf('year')
					.format()
			)
		}
	}).exec((err, data) => apiResponse(req, res, err, data))
})

router.get('/:year/:month', async (req, res) => {
	if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
		return res.status(400).send({
			error: 'Bad Request'
		})

	await Ingreso.find({
		date: {
			$gte: new Date(
				moment()
					.utc()
					.set('year', req.params.year)
					.set('month', parseInt(req.params.month) - 1)
					.startOf('month')
					.format()
			),
			$lte: new Date(
				moment()
					.utc()
					.set('year', req.params.year)
					.set('month', parseInt(req.params.month) - 1)
					.endOf('month')
					.format()
			)
		}
	}).exec((err, data) => apiResponse(req, res, err, data))
})

module.exports = router

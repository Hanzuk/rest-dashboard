const express = require('express')
const router = express.Router()

const Cliente = require('../models/Cliente')

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

router.get('/sede/:headquarter', async (req, res) => {
	if (req.params.headquarter === 'all') {
		return await Cliente.find().exec((err, data) =>
			apiResponse(req, res, err, data)
		)
	}

	if (parseInt(req.params.headquarter) < 1)
		return res.status(400).send({
			error: 'Bad Request'
		})

	await Cliente.find({
		headquarter: { $regex: `${req.params.headquarter}$`, $options: 'im' }
	}).exec((err, data) => apiResponse(req, res, err, data))
})

module.exports = router

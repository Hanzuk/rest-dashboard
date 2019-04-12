const express = require('express')
const router = express.Router()

const Cliente = require('../models/Cliente')

const response = (res, err, data) => {
	if (err) return res.status(404).send({ error: 'Something Happened' })

	if (data) {
		res.status(200).send(data)
	} else {
		res.status(404).send({ error: 'Something Happened' })
	}
}

router.get('/sede/:headquarter', async (req, res) => {
	if (req.params.headquarter === 'all') {
		return await Cliente.find()
			.sort({ headquarter: 1 })
			.exec((err, data) => response(res, err, data))
	}

	if (req.params.headquarter.match(/[a-zA-Z]/g))
		return res.status(404).send({ error: 'Invalid Param' })

	if (parseInt(req.params.headquarter) < 1)
		return res.status(400).send({
			error: 'Bad Request'
		})

	await Cliente.find({
		headquarter: { $regex: `${req.params.headquarter}$`, $options: 'im' }
	}).exec((err, data) => response(res, err, data))
})

module.exports = router

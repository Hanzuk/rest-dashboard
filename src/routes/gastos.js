const express = require('express');
const router = express.Router();

const Gasto = require('../models/Gasto');
const GastoAggr = require('../aggregations/_gastos');

const apiResponse = (req, res, err, data) => {
	if (err) {
		res.status(500).send({
			error: `☠️ Internal Server Error ${err.message}`
		});
	} else {
		if (data) {
			if (data.length > 0) {
				res.status(200).send(data);
			} else {
				res.status(404).send({
					error: '😭 Not found'
				});
			}
		} else {
			res.status(404).send({
				error: '☠️ Not found'
			});
		}
	}
};

router.get('/:year/:month', async (req, res) => {
	if (req.params.month === 'all')
		return await Gasto.aggregate(
			GastoAggr.annual_expenses(parseInt(req.params.year))
		).exec((err, data) => apiResponse(req, res, err, data));

	if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
		return res.status(400).send({
			error: 'Bad Request'
		});

	await Gasto.aggregate(
		GastoAggr.monthly_expenses(
			parseInt(req.params.year),
			parseInt(req.params.month)
		)
	).exec((err, data) => apiResponse(req, res, err, data));
});

router.post('/load', async (req, res) => {
	const randomDate = () => {
		let startDate = new Date('2014-01-01').getTime();
		let endDate = new Date().getTime();
		let space = endDate - startDate;
		let timestamp = Math.round(Math.random() * space);
		timestamp += startDate;
		return new Date(timestamp);
	};
	const randomNum = (min, max) => {
		return Math.round(Math.random() * (max - min) + min);
	};
	let by = ['mantenimiento', 'salarios', 'patrocinios', 'inventario'];
	let docs = [];
	for (let i = 0; i < 90000; i++) {
		docs.push({
			gasto_por: by[randomNum(0, 3)],
			monto: randomNum(15000, 70000),
			fecha: randomDate()
		});
	}
	await Gasto.insertMany(docs);
	res.status(201).send(docs);
});

module.exports = router;

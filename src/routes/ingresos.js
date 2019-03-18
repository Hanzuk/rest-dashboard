const express = require('express');
const router = express.Router();

const Ingreso = require('../models/Ingreso');
const IngresoAggr = require('../aggregations/_ingresos');

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
		return await Ingreso.aggregate(
			IngresoAggr.annual_income(parseInt(req.params.year))
		).exec((err, data) => apiResponse(req, res, err, data));

	if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
		return res.status(400).send({
			error: 'Bad Request'
		});

	await Ingreso.aggregate(
		IngresoAggr.monthly_income(
			parseInt(req.params.year),
			parseInt(req.params.month)
		)
	).exec((err, data) => apiResponse(req, res, err, data));
});

router.get('/:year/:month/:type', async (req, res) => {
	if (req.params.month === 'all')
		return await Ingreso.aggregate(
			IngresoAggr.total_spec_income_year(
				parseInt(req.params.year),
				req.params.type
			)
		).exec((err, data) => apiResponse(req, res, err, data));

	if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
		return res.status(400).send({
			error: 'Bad Request'
		});

	// Types: 'accessories', 'subscription', 'supplements', 'session', 'sportswear' and 'others'
	await Ingreso.aggregate(
		IngresoAggr.total_spec_income_month(
			parseInt(req.params.year),
			parseInt(req.params.month),
			req.params.type
		)
	).exec((err, data) => apiResponse(req, res, err, data));
});

router.post('/load', async (req, res) => {
	// const ingreso = new Ingreso({
	// 	ingreso_por: 'asd',
	// 	monto: 99.99,
	// 	fecha: new Date()
	// });
	// await ingreso.save();
	// res.status(201).send(ingreso);
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
	let by = ['servicio1', 'servicio2', 'servicio3', 'suplemento', 'bebida'];
	let docs = [];
	for (let i = 0; i < 90000; i++) {
		docs.push({
			ingreso_por: by[randomNum(0, 4)],
			monto: randomNum(15000, 75000),
			fecha: randomDate()
		});
	}
	await Ingreso.insertMany(docs);
	res.status(201).send(docs);
});

module.exports = router;

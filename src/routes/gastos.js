const express = require('express');
const router = express.Router();

const Gasto = require('../models/Gasto');
const GastoAggr = require('../aggregations/_gastos');

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

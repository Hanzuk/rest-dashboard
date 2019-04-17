const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.status(200).send({
		Author: 'Roberto Duarte',
		Contact: 'robert0d3@outlook.com',
		Docs: 'https://documenter.getpostman.com/view/6495315/S1ENxJQQ',
		GitHub: 'https://github.com/Hanzuk/rest-dashboard'
	})
})

router.get('/api', (req, res) => {
	res.status(200).send({
		Author: 'Roberto Duarte',
		Contact: 'robert0d3@outlook.com',
		Docs: 'https://documenter.getpostman.com/view/6495315/S1ENxJQQ',
		GitHub: 'https://github.com/Hanzuk/rest-dashboard'
	})
})

module.exports = router

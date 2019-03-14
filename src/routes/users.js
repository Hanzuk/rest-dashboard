const express = require('express')
const router = express.Router()

const User = require('../models/User')
const UsersAgrs = require('../aggregations/_users')

const apiResponse = (req, res, err, data) => {
   if(err) {
      res.status(500).send({
         error: `☠️ Internal Server Error ${err.message}`
      })
   } else {
      if(data) {
         if(data.length > 0) {
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

router.get('/:year/:month', async (req, res) => {
   if (req.params.month === 'all') {
      return await User.aggregate(
        UsersAgrs.total_year_users(parseInt(req.params.year))
      ).exec((err, data) => apiResponse(req, res, err, data));
   }

   if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12) {
      return res.status(400).send({
         error: 'Bad Request'
      })
   }

   await User.aggregate(
      UsersAgrs.total_month_users(parseInt(req.params.year), parseInt(req.params.month))
   ).exec((err, data) => apiResponse(req, res, err, data));
})

module.exports = router

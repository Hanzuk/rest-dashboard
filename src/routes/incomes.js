const express = require('express')
const router = express.Router()

const Income = require('../models/income')
const IncomesAgrs = require('../aggregations/_incomes')

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

router.get('/:year/:month', async(req, res) => {
   if (req.params.month === "all")
      return await Income.aggregate(
         IncomesAgrs.total_gen_income_year(parseInt(req.params.year))
      ).exec((err, data) => apiResponse(req, res, err, data))

   if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
      return res.status(400).send({
         error: "Bad Request"
      })

   await Income.aggregate(
      IncomesAgrs.total_gen_income_month(
         parseInt(req.params.year),
         parseInt(req.params.month)
      )
   ).exec((err, data) => apiResponse(req, res, err, data))
})

router.get('/:year/:month/:type', async(req, res) => {
   if (req.params.month === "all")
      return await Income.aggregate(
         IncomesAgrs.total_spec_income_year(
            parseInt(req.params.year),
            req.params.type
         )
      ).exec((err, data) => apiResponse(req, res, err, data))

   if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12)
      return res.status(400).send({
         error: "Bad Request"
      })

   // Types: 'accessories', 'subscription', 'supplements', 'session', 'sportswear' and 'others'
   await Income.aggregate(
      IncomesAgrs.total_spec_income_month(
         parseInt(req.params.year),
         parseInt(req.params.month),
         req.params.type
      )
   ).exec((err, data) => apiResponse(req, res, err, data))
})

module.exports = router

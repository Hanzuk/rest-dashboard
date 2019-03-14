const express = require('express')
const router = express.Router()

const Poll = require('../models/poll')
const PollsAgrs = require('../aggregations/_polls')

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
   if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12) {
      return res.status(400).send({
         error: 'Bad Request'
      })
   }

   await Poll.aggregate(
      PollsAgrs.general_total(
         parseInt(req.params.year),
         parseInt(req.params.month)
      )
   ).exec((err, data) => apiResponse(req, res, err, data))
})

router.get('/:year/:month/:about', async(req, res) => {
   if (parseInt(req.params.month) < 1 || parseInt(req.params.month) > 12) {
      return res.status(400).send({
         error: 'Bad Request'
      })
   }

   await Poll.aggregate(
      PollsAgrs.specific_total(
         parseInt(req.params.year),
         parseInt(req.params.month),
         req.params.about
      )
   ).exec((err, data) => apiResponse(req, res, err, data))
})

module.exports = router

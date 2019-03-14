const express = require('express')
const router = express.Router()

const Poll = require('../models/poll')
const moment = require('moment')

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
   if(req.params.month >= 1 && req.params.month <= 12) {
      await Poll.aggregate([
         {
            '$match': {
               'date': {
                  '$gte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .set('month', req.params.month - 1)
                     .startOf('month')
                  ), 
                  '$lte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .set('month', req.params.month - 1)
                     .endOf('month')
                  )
               }
            }
         }, {
            '$group': {
               '_id': {
                  'year': { '$year': '$date' }, 
                  'month': { '$month': '$date' }, 
                  'quality': '$quality'
               }, 
               'total': { '$sum': 1 }
            }
         }, {
            '$project': {
               '_id': 0, 
               'quality': '$_id.quality', 
               'total': '$total', 
               'date': {
                  '$dateFromParts': {
                     'year': '$_id.year', 
                     'month': '$_id.month'
                  }
               }
            }
         }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   } else {
      res.status(400).send({
         error: 'Bad Request'
      })
   }
})

router.get('/:year/:month/:about', async(req, res) => {
   if(req.params.month >= 1 && req.params.month <= 12) {
      await Poll.aggregate([
         {
            '$match': {
               'about': req.params.about, 
               'date': {
                  '$gte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .set('month', req.params.month -1) 
                     .startOf('month')
                  ), 
                  '$lte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .set('month', req.params.month -1 )
                     .endOf('month')
                  )
               }
            }
         }, {
            '$group': {
               '_id': {
                  'about': '$about', 
                  'year': { '$year': '$date' }, 
                  'month': { '$month': '$date' }, 
                  'quality': '$quality'
               }, 
               'total': { '$sum': 1 }
            }
         }, {
            '$project': {
               '_id': 0, 
               'about': '$_id.about', 
               'quality': '$_id.quality', 
               'total': '$total', 
               'date': {
                  '$dateFromParts': {
                     'year': '$_id.year', 
                     'month': '$_id.month'
                  }
               }
            }
         }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   } else {
      res.status(400).send({
         error: 'Bad Request'
      })
   }
})

module.exports = router

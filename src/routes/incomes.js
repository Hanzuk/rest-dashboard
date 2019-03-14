const express = require('express')
const router = express.Router()

const Income = require('../models/income')
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
   //Total de ingresos para cada mes del año
   if(req.params.month === 'all') {
      await Income.aggregate([
         {
            '$match': {
               'date': {
                  '$gte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .startOf('year')
                  ),
                  '$lte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .endOf('year')
                  )
               }
            }
         }, {
            '$group': {
               '_id': {
                  'year': { '$year': '$date' }, 
                  'month': { '$month': '$date' }
               }, 
               'total': { '$sum': '$amount' }
            }
         }, {
            '$project': {
               '_id': 0, 
               'date': {
                  '$dateFromParts': {
                  'year': '$_id.year', 
                  'month': '$_id.month'
                  }
               }, 
               'amount': '$total'
            }
         }, {
            '$sort': { 'date': 1 }
         }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   } else {
      //Total de ingresos para un mes específico
      if(req.params.month >= 1 && req.params.month <= 12) {
         await Income.aggregate([
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
                     'month': { '$month': '$date' }
                  }, 
                  'total': { '$sum': '$amount' }
               }
            }, {
               '$project': {
                  '_id': 0, 
                  'date': {
                     '$dateFromParts': {
                        'year': '$_id.year', 
                        'month': '$_id.month'
                     }
                  }, 
                  'amount': '$total'
               }
            }
         ]).exec((err, data) => apiResponse(req, res, err, data))
      } else {
         res.status(400).send({
            error: 'Bad Request'
         })
      }
   }
})
router.get('/:year/:month/:type', async(req, res) => {
   //Total de ingresos específico para cada mes del año
   //Types: 'accessories', 'subscription', 'supplements', 'session', 'sportswear' and 'others'
   if(req.params.month === 'all') {
      await Income.aggregate([
         {
            '$match': {
               'type': req.params.type,
               'date': {
                  '$gte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .startOf('year')
                  ),
                  '$lte': new Date(
                     moment.utc()
                     .set('year', req.params.year)
                     .endOf('year')
                  )
               }
            }
         }, {
            '$group': {
               '_id': {
                  'year': { '$year': '$date' }, 
                  'month': { '$month': '$date' }
               }, 
               'total': { '$sum': '$amount' }
            }
         }, {
            '$project': {
               '_id': 0,
               'type': req.params.type,
               'date': {
                  '$dateFromParts': {
                  'year': '$_id.year', 
                  'month': '$_id.month'
                  }
               }, 
               'amount': '$total'
            }
         }, {
            '$sort': { 'date': 1 }
         }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   } else {
      //Total de ingresos específico para un mes específico
      //Types: 'accessories', 'subscription', 'supplements', 'session', 'sportswear' and 'others'
      if(req.params.month >= 1 && req.params.month <= 12) {
         await Income.aggregate([
            {
               '$match': {
                  'type': req.params.type,
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
                     'type': '$type',
                     'year': { '$year': '$date' }, 
                     'month': { '$month': '$date' }
                  }, 
                  'total': { '$sum': '$amout' }
               }
            }, {
               '$project': {
                  '_id': 0,
                  'type': '$_id.type',
                  'date': {
                     '$dateFromParts': {
                        'year': '$_id.year', 
                        'month': '$_id.month'
                     }
                  }, 
                  'amount': '$total'
               }
            }
         ]).exec((err, data) => apiResponse(req, res, err, data))
      } else {
         res.status(400).send({
            error: 'Bad Request'
         })
      }
   }
})

module.exports = router

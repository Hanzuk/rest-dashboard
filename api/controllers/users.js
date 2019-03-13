const User = require('../models/user')
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

exports.get_total_users = async(req, res) => {
   //Total de usurios de todos los meses del año
   if(req.params.month === 'all') {
      await User.aggregate([
         {
            '$match': {
               'date_joined': {
                  '$gte': new Date(moment.utc().set('year', req.params.year).startOf('year')),
                  '$lte': new Date(moment.utc().set('year', req.params.year).endOf('year'))
               }
            }
         }, {
            '$group': {
               '_id': {
                  'year': { '$year': '$date_joined' },
                  'month': { '$month': '$date_joined' }
               }, 
               'total': { '$sum': 1 }
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
               'total_users': '$total'
            }
         }, { '$sort': { 'date': 1 } }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   } else {
      //Total de usuarios de un mes específico
      if(req.params.month >= 1 && req.params.month <= 12) {
         await User.aggregate([
            {
               '$match': {
                  'date_joined': {
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
                     'year': { '$year': '$date_joined' },
                     'month': { '$month': '$date_joined' }
                  }, 
                  'total': { '$sum': 1 }
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
                  'total_users': '$total'
               }
            }
         ]).exec((err, data) => apiResponse(req, res, err, data))
      } else {
         res.status(400).send({
            error: 'Bad Request'
         })
      }
   }
}

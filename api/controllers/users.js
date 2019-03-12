const User = require('../models/user')
const moment = require('moment')

const apiResponse = (req, res, err, data) => {
   if(err) {
      res.status(500).send({
         message: `☠ Error interno del servidor. ${err.message}`
      })
   } else {
      if(data) {
         if(data.length > 0) {
            res.status(200).send(data)
         } else {
            res.status(404).send({
               message: '😭 No se encuentra la información solicitada.'
            })
         }
      } else {
         res.status(404).send({
            message: '😭 No hay datos'
         })
      }
   }
}

exports.get_total_users = async(req, res) => {

   if(req.params.year != moment().year() && req.params.month === 'all') {
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
                  'month': {
                     '$month': '$date_joined'
                  }
               }, 
               'total': { '$sum': 1 }
            }
         }, { '$sort': { '_id.month': 1 } }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   }

   if(req.params.year != moment().year() && req.params.month !== 'all') {
      await User.aggregate([
         {
            '$match': {
               'date_joined': {
               '$gte': new Date(moment.utc().set('year', req.params.year).set('month', req.params.month).startOf('month')),
               '$lte': new Date(moment.utc().set('year', req.params.year).set('month', req.params.month).endOf('month'))
               }
            }
         }, {
            '$group': {
               '_id': {
                  'month': {
                     '$month': '$date_joined'
                  }
               }, 
               'total': { '$sum': 1 }
            }
         }, { '$sort': { '_id.month': 1 } }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   }

   if(req.params.year == moment().year() && req.params.month === 'all') {
      await User.aggregate([
         {
            '$match': {
               'date_joined': {
               '$gte': new Date(moment.utc().startOf('year')),
               '$lte': new Date(moment.utc().endOf('month'))
               }
            }
         }, {
            '$group': {
               '_id': {
                  'month': {
                     '$month': '$date_joined'
                  }
               }, 
               'total': { '$sum': 1 }
            }
         }, { '$sort': { '_id.month': 1 } }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   }

   if(req.params.year == moment().year() && req.params.month !== 'all') {
      await User.aggregate([
         {
            '$match': {
               'date_joined': {
               '$gte': new Date(moment.utc().set('month', req.params.month).startOf('month')),
               '$lte': new Date(moment.utc().set('month', req.params.month).endOf('month'))
               }
            }
         }, {
            '$group': {
               '_id': {
                  'month': {
                     '$month': '$date_joined'
                  }
               }, 
               'total': { '$sum': 1 }
            }
         }, { '$sort': { '_id.month': 1 } }
      ]).exec((err, data) => apiResponse(req, res, err, data))
   }

}

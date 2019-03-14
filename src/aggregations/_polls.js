const moment = require('moment')

exports.general_total = (year, month) => {
   return [
      {
         '$match': {
            'date': {
               '$gte': new Date(
                  moment.utc()
                  .set('year', year)
                  .set('month', month - 1)
                  .startOf('month')
               ), 
               '$lte': new Date(
                  moment.utc()
                  .set('year', year)
                  .set('month', month - 1)
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
                  'month': '$_id.month',
                  'day': 10
               }
            }
         }
      }
   ]
}

exports.specific_total = (year, month, about) => {
   return [
      {
         '$match': {
            'about': about, 
            'date': {
               '$gte': new Date(
                  moment.utc()
                  .set('year', year)
                  .set('month', month -1) 
                  .startOf('month')
               ), 
               '$lte': new Date(
                  moment.utc()
                  .set('year', year)
                  .set('month', month -1 )
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
                  'month': '$_id.month',
                  'day': 10
               }
            }
         }
      }
   ]
}

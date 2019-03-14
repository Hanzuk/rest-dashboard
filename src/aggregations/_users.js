const moment = require('moment')

exports.total_year_users = (year) => {
   return [
      {
         '$match': {
            'date_joined': {
               '$gte': new Date(moment.utc().set('year', year).startOf('year')),
               '$lte': new Date(moment.utc().set('year', year).endOf('year'))
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
                  'month': '$_id.month',
                  'day': 10
               }
            }, 
            'total_users': '$total'
         }
      }, { '$sort': { 'date': 1 } }
   ]
}

exports.total_month_users = (year, month) => {
   return [
      {
         '$match': {
            'date_joined': {
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
                  'month': '$_id.month',
                  'day': 10
               }
            }, 
            'total_users': '$total'
         }
      }
   ]
}

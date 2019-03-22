const moment = require('moment');

exports.annual_expenses = year => {
	return [
		{
			$match: {
				fecha: {
					$gte: new Date(
						moment
							.utc()
							.set('year', year)
							.startOf('year')
					),
					$lte: new Date(
						moment
							.utc()
							.set('year', year)
							.endOf('year')
					)
				}
			}
		},
		{
			$group: {
				_id: {
					year: { $year: '$fecha' },
					month: { $month: '$fecha' }
				},
				monto: { $sum: '$monto' }
			}
		},
		{
			$project: {
				_id: 0,
				amount: '$monto',
				date: {
					$dateFromParts: {
						year: '$_id.year',
						month: '$_id.month',
						day: 10
					}
				}
			}
		},
		{
			$sort: { date: 1 }
		}
	];
};

exports.monthly_expenses = (year, month) => {
	return [
		{
			$match: {
				fecha: {
					$gte: new Date(
						moment
							.utc()
							.set('year', year)
							.set('month', month - 1)
							.startOf('month')
					),
					$lte: new Date(
						moment
							.utc()
							.set('year', year)
							.set('month', month - 1)
							.endOf('month')
					)
				}
			}
		},
		{
			$group: {
				_id: {
					year: { $year: '$fecha' },
					month: { $month: '$fecha' }
				},
				total: { $sum: '$monto' }
			}
		},
		{
			$project: {
				_id: 0,
				amount: '$total',
				date: {
					$dateFromParts: {
						year: '$_id.year',
						month: '$_id.month',
						day: 10
					}
				}
			}
		}
	];
};

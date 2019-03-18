const moment = require('moment');

exports.annual_income = year => {
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
				monto: 1,
				fecha: {
					$dateFromParts: {
						year: '$_id.year',
						month: '$_id.month',
						day: 10
					}
				}
			}
		},
		{
			$sort: { fecha: 1 }
		}
	];
};

exports.monthly_income = (year, month) => {
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
				monto: { $sum: '$monto' }
			}
		},
		{
			$project: {
				_id: 0,
				monto: 1,
				fecha: {
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

exports.total_spec_income_year = (year, type) => {
	return [
		{
			$match: {
				type: type,
				date: {
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
					year: { $year: '$date' },
					month: { $month: '$date' }
				},
				total: { $sum: '$amount' }
			}
		},
		{
			$project: {
				_id: 0,
				type: '$_id.type',
				date: {
					$dateFromParts: {
						year: '$_id.year',
						month: '$_id.month',
						day: 10
					}
				},
				amount: '$total'
			}
		},
		{
			$sort: { date: 1 }
		}
	];
};

exports.total_spec_income_month = (year, month, type) => {
	return [
		{
			$match: {
				type: type,
				date: {
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
					type: '$type',
					year: { $year: '$date' },
					month: { $month: '$date' }
				},
				total: { $sum: '$amount' }
			}
		},
		{
			$project: {
				_id: 0,
				type: '$_id.type',
				date: {
					$dateFromParts: {
						year: '$_id.year',
						month: '$_id.month',
						day: 10
					}
				},
				amount: '$total'
			}
		}
	];
};

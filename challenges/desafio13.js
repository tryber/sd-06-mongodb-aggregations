db.trips.aggregate([
  {
    $match: { startTime: { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") } },
  },
  {
    $group: {
      _id: null,
      duracaoMediaMilissegundos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $addFields: {
      convertToMinutes: 60 * 1000,
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: { $divide: ["$duracaoMediaMilissegundos", "$convertToMinutes"] },
    },
  },
  {
    $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } },
  },
]);

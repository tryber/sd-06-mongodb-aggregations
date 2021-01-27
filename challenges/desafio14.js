db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
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
      duracaoMedia: { $ceil: { $divide: ["$duracaoMediaMilissegundos", "$convertToMinutes"] } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: { _id: 0, bikeId: "$_id", duracaoMedia: 1 },
  },
]);

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMediaMilissegundos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $addFields: {
      convertToHours: 3600000,
    },
  },
  {
    $addFields: {
      duracaoMedia: { $divide: ["$duracaoMediaMilissegundos", "$convertToHours"] },
    },
  },
  {
    $project: {
      duracaoMediaMilissegundos: 1, duracaoMedia: 1, convertToHours: 1,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
]);

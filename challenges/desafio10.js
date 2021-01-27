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
      duracaoMedia: { $multiply: [{ $toInt: "$duracaoMediaMilissegundos" }, "$convertToHours"] },
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

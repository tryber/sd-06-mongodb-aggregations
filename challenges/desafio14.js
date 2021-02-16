db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      totalDeUsos: { $sum: 1 },
      duracaoMediaMinutos: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
      },
    },
  },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaMinutos" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      timer: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$timer", 60000] } },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

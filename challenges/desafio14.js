db.trips.aggregate([
  {
    $addFields: {
      trip_avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$trip_avg" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);

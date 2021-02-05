db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
        },
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
      _id: false,
    },
  },
  { $limit: 5 },
]);

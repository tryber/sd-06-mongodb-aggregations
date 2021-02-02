db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      id: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

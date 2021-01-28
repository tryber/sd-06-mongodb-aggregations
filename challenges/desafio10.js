db.trips.aggregate([
  {
    $group: {
      _id: "$userType",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

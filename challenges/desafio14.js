db.trips.aggregate([
  {
    $set: {
      tempo: {
        $divide: [{
          $abs: {
            $subtract: ["$startTime", "$stopTime"],
          },
        }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: { $ceil: { $multiply: ["$tempo", 60] } } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: { bikeId: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 0] }, _id: 0 },
  },
]);

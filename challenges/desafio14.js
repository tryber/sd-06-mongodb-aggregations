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
      duracaoMediaEmMinutos: { $avg: { $ceil: { $multiply: ["$tempo", 60] } } },
    },
  },
  {
    $sort: { duracaoMediaEmMinutos: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: { bikeid: "$_id", duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] }, _id: 0 },
  },
]);

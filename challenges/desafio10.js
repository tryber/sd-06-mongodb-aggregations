db.trips.aggregate([
  {
    $addFields: {
      duracaoViagem: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia_unround: {
        $avg: {
          $divide: ["$duracaoViagem", 1000 * 60 * 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia_unround", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

db.trips.aggregate([
  {
    $addFields: {
      duracaoMediaEmMinutos: {
        $divide: [
          {
            $avg: {
              $subtract: ["$stopTime", "$startTime"],
            },
          }, 60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$duracaoMediaEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

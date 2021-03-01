db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{
            $subtract: ["$stopTime", "$startTime"],
          }, 1000 * 60],
        },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
]);

db.trips.aggregate([
  {
    $addFields: {
      tripTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avg_trip: {
        $avg: "$tripTime",
      },
    },
  },
  {
    $sort: {
      avg_trip: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: [{
          $divide: ["$avg_trip", 1000 * 60],
        }],
      },
    },
  },
]);

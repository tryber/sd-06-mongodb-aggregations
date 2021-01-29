db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTripTime: { $avg: "$tripTime" },
    },
  },
  {
    $sort: { avgTripTime: -1 },
  },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$avgTripTime", 60000] } },
    },
  },
  { $limit: 5 },
]);

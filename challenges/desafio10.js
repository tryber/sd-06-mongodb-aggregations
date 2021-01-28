db.trips.aggregate([
  {
    $addFields: {
      trip_avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$trip_avg" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);

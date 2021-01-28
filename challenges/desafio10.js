db.trips.aggregate([
  {
    $addFields: {
      tripTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avg_trip: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$avg_trip", 1000 * 60 * 60] }, 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

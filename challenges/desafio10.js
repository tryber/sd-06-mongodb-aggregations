db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      timer: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$timer", 3.6e+6] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

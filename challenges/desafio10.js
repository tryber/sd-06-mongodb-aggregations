db.trips.aggregate([
  { $project: {
    usertype: 1,
    durationHours: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60,
    ] } },
  },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$durationHours" },
  } },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);

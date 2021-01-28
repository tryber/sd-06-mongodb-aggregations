db.trips.aggregate([
  { $addFields: {
    duracaoMinutos: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
    },
  } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: "$duracaoMinutos" },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: ["$duracaoMedia"] } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

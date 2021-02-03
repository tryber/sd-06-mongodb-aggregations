db.trips.aggregate([
  { $project: {
    bikeid: 1,
    duracaoEmMinutos: { $abs: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
    } },
  } },
  { $group: { _id: "$bikeid", duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" } } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

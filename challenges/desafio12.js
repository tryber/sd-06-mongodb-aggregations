db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  { $group: { _id: "$startStationName", count: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $project: { nomeEstacao: "$_id", total: "$count", _id: false } },
  { $limit: 1 },
]);
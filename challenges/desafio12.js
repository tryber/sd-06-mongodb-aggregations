db.trips.aggregate([
  { $addFields: { d: { $dayOfWeek: "$startTime" } } },
  { $match: { d: 5 } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$total" } },
  { $limit: 1 },
]);

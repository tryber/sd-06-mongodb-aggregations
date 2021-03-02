db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  { $group: { _id: "$startStationName", allTrips: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$allTrips" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

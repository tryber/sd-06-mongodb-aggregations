db.trips.aggregate([
  { $addFields: { dayWeek: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$dayWeek", allTrips: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$allTrips" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

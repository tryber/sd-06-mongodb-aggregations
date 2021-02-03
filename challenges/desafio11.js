db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, totalDia: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", totalDia: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

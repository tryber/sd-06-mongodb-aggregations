db.trips.aggregate([
  { $addFields: { d: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: "$d",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$total" } },
  { $limit: 1 },
]);

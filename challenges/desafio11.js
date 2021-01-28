db.trips.aggregate([
  { $group: {
    _id: "$startTime",
    total: { $sum: 1 },
  } },
  { $project: { _id: false, diaDaSemana: { $dayOfWeek: "$_id" }, total: true } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

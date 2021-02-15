db.trips.aggregate([
  { $project: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  {
    $group: {
      diaDaSemana: "$_id",
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

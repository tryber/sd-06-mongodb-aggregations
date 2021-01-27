db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      diaDaSemana: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: "$_id",
      total: "$diaDaSemana",
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);

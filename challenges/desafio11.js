db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);

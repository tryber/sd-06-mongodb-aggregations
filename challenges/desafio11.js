db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      diaDaSemana: { $first: "$diaDaSemana" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: 1,
      _id: 0,
      total: 1,
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);

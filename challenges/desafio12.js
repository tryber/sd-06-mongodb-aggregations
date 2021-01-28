db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDaSemana: { $dayOfWeek: "$startTime" },
      nomeEstacao: "$startStationName",
    },
  },
  {
    $match: {
      $expr: {
        $eq: ["$diaDaSemana", 5],
      },
    },
  },
  {
    $group: {
      _id: "$nomeEstacao",
      nomeEstacao: { $first: "$nomeEstacao" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: 1,
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

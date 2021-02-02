db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: { diaDaSemana: { $eq: 5 } },
  },
  {
    $group: {
      _id: { start: "$startStation", dayOFW: "$diaDaSemana" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$startStationName",
      total: "$total",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);

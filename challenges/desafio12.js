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
      _id: { start: "$startStationName", dayOFW: "$diaDaSemana" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id.start",
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

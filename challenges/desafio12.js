db.trips.aggregate([
  {
    $set: { diaSemana: { $dayOfWeek: "$startTime" } },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaSemana",
        nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $project: { nomeEstacao: "$_id.nomeEstacao", total: "$total", _id: 0 },
  },
  {
    $limit: 1,
  },
]);

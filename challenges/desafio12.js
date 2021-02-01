db.trips.aggregate([
  {
    $addFields: {
      dia_da_semana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$dia_da_semana",
        nomeEstacao: "$startStationName" },
      total_de_viagens: { $sum: 1 },
    },
  },
  { $sort: { total_de_viagens: -1 } },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: { $max: ["$total_de_viagens"] },
    },
  },
  { $limit: 1 },
]);

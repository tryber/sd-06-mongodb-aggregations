db.trips.aggregate([
  {
    $addFields: {
      dia_da_semana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dia_da_semana",
      total_de_viagens: { $sum: 1 },
    },
  },
  { $sort: { total_de_viagens: -1 } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: { $max: ["$total_de_viagens"] } } },
  { $limit: 1 },
]);

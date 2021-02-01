db.trips.aggregate([
  {
    $project: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total_diaDaSemana: { $sum: 1 },
    },
  },
  {
    $sort: {
      total_diaDaSemana: -1,
    },
  },
  { $limit: 1 },
  {
    $lookup: {
      from: "trips",
      as: "nomeEstacao_lookup",
      let: { diaDaSemana_maior: "$_id" },
      pipeline: [
        {
          $addFields: {
            diaDaSemana: { $dayOfWeek: "$startTime" },
          },
        },
        {
          $match: {
            $expr: { $eq: ["$diaDaSemana", "$$diaDaSemana_maior"] },
          },
        },
        {
          $group: {
            _id: { nomeEstacao_chave: "$startStationName" },
            totalEstacao: { $sum: 1 },
          },
        },
        {
          $sort: {
            totalEstacao: -1,
          },
        },
        { $limit: 1 },
      ],
    },
  },
  { $unwind: "$nomeEstacao_lookup" },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$nomeEstacao_lookup._id.nomeEstacao_chave",
      total: "$nomeEstacao_lookup.totalEstacao",
    },
  },
]);

db.trips.aggregate([
  {
    $group: {
      _id: {
        estacao: "$startStationName",
        dia: { $dayOfWeek: "$startTime" },
      },
      totalDias: { $sum: 1 },
    },
  },
  {
    $match: {
      "_id.dia": 5,
    },
  },
  {
    $sort: {
      totalDias: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$totalDias",
    },
  },
]);

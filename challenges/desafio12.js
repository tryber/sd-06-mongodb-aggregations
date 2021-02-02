db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  { $match: {
    $expr: {
      $eq: ["$diaDaSemana", 5],
    },
  } },
  {
    $group: {
      _id: "$startStationName",
      totalStation: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalStation",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

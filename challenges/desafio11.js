db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  {
    $group: {
      _id: "$diaDaSemana",
      totalViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$totalViagens",
      _id: false,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

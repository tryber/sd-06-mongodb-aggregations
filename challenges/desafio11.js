db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      totalDias: { $sum: 1 },
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
      diaDaSemana: "$_id",
      total: "$totalDias",
    },
  },
]);

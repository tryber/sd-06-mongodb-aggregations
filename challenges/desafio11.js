db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      trips: { $sum: 1 },
    },
  },
  {
    $sort: {
      trips: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$trips",
    },
  },
]);

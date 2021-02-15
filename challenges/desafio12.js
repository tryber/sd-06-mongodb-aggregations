db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [{ $dayOfWeek: "$startTime" }, 5],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id",
      total: true,
      _id: false,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

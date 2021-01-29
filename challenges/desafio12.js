db.trips.aggregate([
  {
    $addFields: {
      day_of_week: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      day_of_week: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$count",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

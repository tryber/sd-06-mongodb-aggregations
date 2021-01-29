db.trips.aggregate([
  {
    $addFields: {
      day_of_week: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$day_of_week",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$count",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

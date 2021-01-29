db.trips.aggregate([
  {
    $addFields: {
      startDayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: { startDayOfWeek: 5 },
  },
  {
    $group: {
      _id: "$startStationName",
      countDayOfWeek: { $sum: 1 },
    },
  },
  {
    $sort: { countDayOfWeek: -1 },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id",
      total: "$countDayOfWeek",
    },
  },
  { $limit: 1 },
]);

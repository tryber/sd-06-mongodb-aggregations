db.trips.aggregate([
  {
    $addFields: {
      startDayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$startDayOfWeek",
      countDayOfWeek: { $sum: 1 },
    },
  },
  {
    $sort: { countDayOfWeek: -1 },
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$countDayOfWeek",
    },
  },
  { $limit: 1 },
]);

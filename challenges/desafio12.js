db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      totalViagens: {
        $sum: 1,
      },
    },
  },
  {

    $project: {
      diaDaSemana: "$_id",
      total: "$totalViagens",
      _id: 0,
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },

  {
    $group: {
      _id: "$startStationId",
    },
  },
]);

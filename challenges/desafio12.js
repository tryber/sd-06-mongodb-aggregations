db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  {

    $project: {

      nomeEstacao: "$startStationName",
      total: 1,
      _id: 0,
    },
  },
  {
    $group: {
      _id: "$nomeEstacao",
      total: {
        $sum: 1,
      },

    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
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

]);

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
    $lookup: {
      from: "trips",
      let: { dayOfTheWeek: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$dayOfTheWeek"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
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
      ],
      as: "busy_station",
    },
  },
  {
    $unwind: "$busy_station",
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$busy_station._id",
      total: "$busy_station.trips",
    },
  },
]);

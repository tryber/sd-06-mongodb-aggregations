db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {
            $dateToString: {
              date: "$startTime",
              format: "%Y-%m-%d",
            },
          },
          "2016-03-10",
        ],
      },
    },
  },
  {
    $addFields: {
      tripTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: null,
      avg_trip: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$avg_trip", 1000 * 60] } },
    },
  },
]);

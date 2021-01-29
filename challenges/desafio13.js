db.trips.aggregate([
  {
    $addFields: {
      trip_avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },

  {
    $project: {
      _id: 0,
      date: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
      trip_avg: "$trip_avg",
    },
  },
  {
    $match: {
      date: /2016-03-10/,
    },
  },
  {
    $group: {
      _id: "$date",
      duracaoMediaEmMinutos: { $avg: "$trip_avg" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0],
      },
    },
  },
]);

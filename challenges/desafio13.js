db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lte: ISODate("2016-03-11T23:59:59Z") },
    },
  },
  {
    $group: {
      _id: null,
      mediaNaoArredondada: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMedia: {
        $round: ["$mediaNaoArredondada", 1],
      },
    },
  },
]);

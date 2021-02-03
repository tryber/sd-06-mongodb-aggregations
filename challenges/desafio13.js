db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: ISODate("2016-03-10") } },
        { startTime: { $lt: ISODate("2016-03-11") } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$duracaoMediaEmMinutos", 60000],
        },
      },
    },
  },
]);

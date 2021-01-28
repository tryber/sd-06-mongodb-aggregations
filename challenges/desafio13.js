db.trips.aggregate([
  { $match: {
    startTime: {
      $gte: ISODate("2016-03-10T00:00:00Z"),
      $lt: ISODate("2016-03-11T00:00:00Z"),
    },
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: {
      $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000, /* milisseg * seg */
        ],
      },
    },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: ["$duracaoMediaEmMinutos"] },
  } },
]);

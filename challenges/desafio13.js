db.trips.aggregate([
  {
    $match: {
      startTime: {
        $lte: ISODate("2016-03-11T00:00:00Z"),
        $gte: ISODate("2016-03-10T00:00:00"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia:
      { $avg:
        {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
  } },
]);

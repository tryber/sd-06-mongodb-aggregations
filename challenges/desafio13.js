db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $set: {
      tempo: {
        $divide: [{
          $abs: {
            $subtract: ["$startTime", "$stopTime"],
          },
        }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "tempo",
      duracaoMediaEmMinutos: { $avg: { $ceil: { $multiply: ["$tempo", 60] } } },
    },
  },
  {
    $project: { duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] }, _id: 0 },
  },
]);
// teste

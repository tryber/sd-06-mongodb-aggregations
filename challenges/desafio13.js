db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10T00:00:01"), $lte: ISODate("2016-03-10T23:59:59") },
    },
  },
  {
    $addFields: {
      diferençaTempo: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "null",
      media: { $avg: "$diferençaTempo" },
    },
  },
  {
    $addFields: {
      conversaoTempo: { $divide: ["$media", 60000] },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$conversaoTempo" },
    },
  },
]);

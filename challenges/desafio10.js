db.trips.aggregate([
  {
    $set: { tempoViagem: { $divide: [{ $abs: { $subtract: ["$startTime", "$stopTime"] } }, 3600000] } },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$tempoViagem" },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: { tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] }, _id: 0 },
  },
]);

db.trips.aggregate([
  {
    $addFields: {
      diferençaTempo: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: "$diferençaTempo" },
    },
  },
  {
    $addFields: {
      conversaoTempo: { $divide: ["$media", 3600000] },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$conversaoTempo", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

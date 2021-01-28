db.trips.aggregate([
  { $addFields: {
    duracao: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 3600],
    },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$duracao" },
  } },
  { $project: { duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);

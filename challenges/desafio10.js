db.trips.aggregate([
  { $addFields: { duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60000] } } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$duracao" },
  } },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);

db.trips.aggregate([
  { $addFields: {
    duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60] },
  } },
  { $group: {
    _id: "$usertype",
    duracao_avg: { $avg: "$duracao" },
  } },
  { $project: { usertype: 1, duracaoMedia: { $round: ["$duracao_avg", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);

db.trips.aggregate([
  { $group: { _id: "$usertype", mediaDuracao: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } } } },
  { $project: { _id: 0, tipo: "$_id", mediaDuracao: { $round: ["$mediaDuracao", 2] } } },
  { $sort: { mediaDuracao: 1 } },
]);

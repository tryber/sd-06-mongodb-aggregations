db.trips.aggregate([
  { $addFields: {
    diferencaTempo: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $group: {
    _id: "$usertype",
    media: { $avg: "$diferencaTempo" },
  } },
  { $addFields:
    { conversaoTempo: { $divide: ["$media", 3600000] },
    } },
  { $project: {
    _id: 1,
    duracaoMedia: { $round: ["$conversaoTempo", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);

db.trips.aggregate([
  { $addFields: {
    duration: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  } },
  { $group: {
    _id: "$bikeid",
    duration: { $avg: "$duration" },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duration" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);

db.trips.aggregate([
  { $addFields: {
    trip_time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
  } },
  { $group: {
    _id: "$usertype",
    media: { $avg: "$trip_time" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$media", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);

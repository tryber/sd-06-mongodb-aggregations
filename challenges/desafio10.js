db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    calculoViagem: { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
    } },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$calculoViagem", 2] },
  } },
  { $sort: {
    tipo: -1,
  } },
]);

db.trips.aggregate([
  { $addFields: { travelTime: { $divide: [ { $subtract: ["$stopTime", "$startTime"] }, 60000 ] } } },
  { $group: {
    _id: "$bikeid",
    avgTravelTime: { $avg: "$travelTime" },
  } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$avgTravelTime" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
],
{ allowDiskUse: true });

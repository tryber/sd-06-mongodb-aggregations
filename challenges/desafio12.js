db.trips.aggregate([
  { $addFields: {
    dayOfTheWeek: { $dayOfWeek: "$startTime" },
  } },
  { $match: { dayOfTheWeek: 5 } },
  { $group: {
    _id: "$startStationName",
    totalViagens: { $sum: 1 },
  } },
  { $sort: { totalViagens: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalViagens",
  } },
]);

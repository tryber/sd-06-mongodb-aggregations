db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
  } },
  { $match: {
    diaDaSemana: { $eq: 5 },
  } },
  { $group: {
    _id: "$startStationName",
    totalDias: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalDias",
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);

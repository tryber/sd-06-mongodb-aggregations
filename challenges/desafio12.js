db.trips.aggregate([
  { $lookup: {
    from: "trips",
    let: { tripDay: { $dayOfWeek: "$startTime" } },
    pipeline: [
      { $project: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
      { $group: { _id: "$dayOfWeek", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, diaDaSemanaMaisViagens: "$_id" } },
    ],
    as: "MaxTripsDay",
  } },
  { $project: {
    dayObj: { $arrayElemAt: ["$MaxTripsDay", 0] },
    startStationName: 1,
    startTime: 1,
  } },
  { $match: { $expr: {
    $eq: ["$dayObj.diaDaSemanaMaisViagens", { $dayOfWeek: "$startTime" }],
  } } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$total" } },
]);

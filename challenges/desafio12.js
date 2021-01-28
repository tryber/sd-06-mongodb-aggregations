db.trips.aggregate([
  { $lookup: {
    from: "trips",
    let: { tripDate: "$startTime" },
    pipeline: [
      { $project: { dia: { $dayOfWeek: "$startTime" } } },
      { $group: { _id: "$dia", totalX: { $sum: 1 } } },
      { $sort: { totalX: -1 } },
      { $limit: 1 },
      { $match: { $expr: { $eq: [{ $dayOfWeek: "$$tripDate" }, "$_id"] } } },
    ],
    as: "tripsInMaxDay",
  } },
  { $group: { _id: "$startStationName", total: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

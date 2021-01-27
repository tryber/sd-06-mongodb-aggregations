db.trips.aggregate([
  { $match: {
    $expr: { $ep: [{ $dayOfWeek: "$startTime" }, 5] },
  } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

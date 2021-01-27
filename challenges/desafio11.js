db.trips.aggregate([
  { $addFields: {
    weekDayStart: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$weekDayStart",
    total: { $sum: 1 },
  } },
  { $project: {
    diaDaSemana: "$_id",
    total: 1,
    _id: 0,
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);

db.trips.aggregate([
// preciso repensar esta query não dá pra usar a do 11
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      diaDaSemana: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: "$_id",
      total: "$diaDaSemana",
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);

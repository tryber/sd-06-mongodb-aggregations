db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "routes",
  } },
  { $unwind: "$routes" },
  { $match: {
    $or: [
      { "routes.airplane": "747" },
      { "routes.airplane": "380" },
    ],
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $project: { _id: 1, totalRotas: 1 } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

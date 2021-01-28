db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      foreignField: "airline.name",
      localField: "airlines",
      as: "routes",
    },
  },
  { $unwind: { path: "$routes" } },
  {
    $match: {
      "routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

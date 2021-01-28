db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      foreignField: "airline.name",
      localField: "airlines",
      as: "air_routes_doc",
    },
  },
  { $unwind: "$air_routes_doc" },
  {
    $match: { "air_routes_doc.airplane": { $in: ["747", "380"] } },
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

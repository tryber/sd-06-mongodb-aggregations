db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      foreignField: "airline.name",
      localField: "airlines",
      as: "air_routes_doc",
    },
  },
  {
    $match: { "air_routes_doc.airplane": { $in: ["747", "380"] } },
  },
  {
    $group: {
      _id: "$airlines",
      totalRotas: { $sum: { $size: "$air_routes_doc" } },
    },
  },
  { $sort: { totalRotas: -1 } },
]);

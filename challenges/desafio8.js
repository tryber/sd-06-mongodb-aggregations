db.movies.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airlines.name",
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  { $match: {
    "routes.airplane": { $in: ["747", "380"] },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

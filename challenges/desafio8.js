db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup:
    { from: "air_routes",
      let: { routeAirlines: "$airlines" },
      pipeline: [
        { $match: { airplane: { $in: ["747", "380"] }, $expr: { $eq: ["$airline.name", "$$routeAirlines"] } } },
      ],
      as: "routesMatch" },
  },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$routesMatch" } } } },
  { $limit: 1 },
]);

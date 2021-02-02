db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { childAirline: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              { $expr: { $eq: ["$airline.name", "$$childAirline"] } },
              { airplane: { $in: ["747", "380"] } },
            ],
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $addFields: {
      routeQuantities: { $size: "$routes" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routeQuantities" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
]);

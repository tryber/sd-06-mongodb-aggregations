db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      let: { airL: "$airlines" },
      from: "air_routes",
      pipeline: [
        {
          $match: {
            $and: [
              { $expr: { $eq: ["$airline.name", "$$airL"] } },
              { airplane: { $in: ["747", "380"] } },
            ],
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: { $size: "$routes" } },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

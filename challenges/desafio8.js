use("aggregations");
db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { routes_info: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$airline.name", "$$routes_info"],
                },
              },
              { airplane: { $in: ["380", "747"] } },
            ],
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $addFields:
      {
        routes_quantity: { $size: "$routes" },
      },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routes_quantity" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
]);

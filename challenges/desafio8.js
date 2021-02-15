db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airline_name: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$$airline_name", "$airline.name"] },
                {
                  $or: [
                    { $eq: ["$airplane", "747"] },
                    { $eq: ["$airplane", "380"] },
                  ],
                },
              ],
            },
          },
        },
      ],
      as: "alliance_routes",
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: { $size: "$alliance_routes" } },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

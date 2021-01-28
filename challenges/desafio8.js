db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airlineName: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$airline.name", "$$airlineName"],
                },
              },
              {
                airplane: { $in: ["747", "380"] },
              },
            ],
          },
        },
      ],
      as: "route",
    },
  },
  {
    $addFields: {
      routeSize: { $size: "$route" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routeSize" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);

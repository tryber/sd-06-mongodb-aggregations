db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airlineFromAlliance: "$airlines" },
      pipeline: [
        { $match: { $expr: {
          $and: [
            { $eq: ["$airline.name", "$$airlineFromAlliance"] },
            { $or: [
              { $eq: ["$airplane", "747"] },
              { $eq: ["$airplane", "380"] },
            ] },
          ],
        } } },
      ],
      as: "routes",
    },
  },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$routes" } } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

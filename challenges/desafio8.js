db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$airline.name", "$$airlines"] },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "matchingAirlines",
    },
  },
  { $unwind: "$matchingAirlines" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

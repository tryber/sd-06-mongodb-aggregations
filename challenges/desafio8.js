db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
    {
      let: { each_airline: "$airlines" },
      from: "air_routes",
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$each_airline"],
            },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "new_output",
    },
  },
  {
    $addFields: { companyRoutes: { $size: "$new_output" } },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$companyRoutes" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $limit: 1,
  },
]);

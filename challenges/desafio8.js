db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { air: "$airlines" },
      pipeline: [
        {
          $match: {
            $or: [{ airplane: "747" }, { airplane: "380" }],
            $expr: { $eq: ["$airline.name", "$$air"] },
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $addFields: {
      total_routes: { $size: "$routes" },
    },
  },
  { $group:
    {
      _id: "$name",
      totalRotas: { $sum: "$total_routes" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

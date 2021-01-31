db.air_alliances.aggregate(
  [
    { $unwind: "$airlines" },
    { $lookup: {
      from: "air_routes",
      let: { airlines: "$airlines" },
      pipeline: [{
        $match: {
          $expr: { $eq: ["$airline.name", "$$airlines"] },
          $or: [{ airplane: "747" }, { airplane: "380" }],
        },
      }],
      as: "route",
    } },
    { $unwind: "$route" },
    { $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    } },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 },
  ],
);

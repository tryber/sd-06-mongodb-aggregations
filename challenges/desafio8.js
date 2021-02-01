db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airlines: "$airlines" },
    pipeline: [
      { $match: { $and: [
        { $expr: { $eq: ["$airline.name", "$$airlines"] } },
        { airplane: { $in: ["747", "380"] } },
      ] } },
    ],
    as: "query_routes",
  } },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$query_routes" } } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

db.air_alliance.aggregate([
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "eachRoute",
  } },
  { $unwind: "$eachRoute" },
  { $match: { "eachRoute.airplane": { $in: ["380", "747"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $project: { _id: 1, totalRotas: 1 } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

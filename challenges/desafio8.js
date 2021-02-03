db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    let: { airlines: "$airlines" },
    from: "air_routes",
    pipeline: [{
      $match: {
        $expr: { $eq: ["$airline.name", "$$airlines"] },
        airplane: { $in: ["747", "380"] },
      },
    }],
    as: "plane_routes",
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: { $size: "$plane_routes" } },
  } },
  { $project: {
    _id: 1,
    totalRotas: 1,
  } },
  { $sort: {
    totalRotas: -1,
  } },
  { $limit: 1 },
]);

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    as: "routes",
    let: { company: "$airlines" },
    pipeline: [
      { $match: { airplane: { $in: ["747", "380"] } } },
      { $match: { $expr: { $eq: ["$airline.name", "$$company"] } } },
      { $group: { _id: "$airline.name", total: { $sum: 1 } } },
    ],
  } },
  { $match: { routes: { $size: 1 } } },
  { $unwind: "$routes" },
  { $project: { _id: 0, alliance: "$name", name: "$airlines", routes: "$routes.total" } },
  { $group: { _id: "$alliance", totalRotas: { $sum: "$routes" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { companies: "$airlines" },
    pipeline: [
      { $match: {
        $expr: { $eq: ["$airline.name", "$$companies"] },
        airplane: { $in: ["747", "380"] },
      } },
    ],
    as: "allCompanies",
  } },
  { $unwind: "allCompanies" },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { company: "$airlines" },
    pipeline: [
      {
        $match: {
          airplane: { $in: ["747", "380"] },
          $expr: { $eq: ["$$company", "$airline.name"] },
        },
      },
    ],
    as: "routes",
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: { $size: "$routes" } },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "routes",
  } },
  { $unwind: "$routes" },
  { $match: {
    "routes.airplane": { $in: ["747", "380"] },
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

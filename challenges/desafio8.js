db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airline_name: "$airlines" },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ["$airline.name", "$$airline_name"],
          },
        },
      },
      { $match: { airplane: { $in: ["747", "380"] } } },
    ],
    as: "airlineRoutes",
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: { $size: "$airlineRoutes" } },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

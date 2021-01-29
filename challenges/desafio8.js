db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      as: "lookup_air_routes",
      let: { airlines_alliances: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$airlines_alliances"] },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
      ],
    },
  },
  { $unwind: "$lookup_air_routes" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$lookup_air_routes.total" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);

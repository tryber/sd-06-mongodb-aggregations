// question done together with trybe monitor
db.air_alliances.aggregate([
  // unwind to open array of airlines.
  {
    $unwind: "$airlines",
  },
  // lookup to join air_alliances with air_routes.
  {
    $lookup: {
      from: "air_routes",
      let: { air: "$airlines" },
      pipeline: [
        {
          // match to filter 380 and 747 and expr to intersect collections.
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
    // addFields to create new field with size of routes per company.
    $addFields: {
      total_routes: { $size: "$routes" },
    },
  },
  // group to join by name all companies with their routes.
  { $group:
    {
      _id: "$name",
      totalRotas: { $sum: "$total_routes" },
    },
  },
  // sort decreasing and limit to get first result.
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

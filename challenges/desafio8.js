db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "name",
      foreignField: "airline.name",
      as: "rotas",
    },
  },
  {
    $match: {
      $or: [{ "rotas.airplane": "747" }, { "rotas.airplane": "380" }],
    },
  },
  {
    $group: {
      _id: "$rotas.airline.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $limit: 1,
  },
]);

db.air_routes.aggregate([
  {
    $match: {
      $or: [{ airplane: "747" }, { airplane: "380" }],
    },
  },
  {
    $group: {
      _id: "$airline.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);

db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { cadaAirline: "$airlines" },
      pipeline: [
        {
          $match: {
            $or: [{ airplane: "747" }, { airplane: "380" }],
            $expr: {
              $eq: ["$$cadaAirline", "$airline.name"],
            },
          },
        },
      ],
      as: "allianceRoutes",
    },
  },
  {
    $group: {
      _id: "$airlines",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  {
    $limit: 1,
  },
]);

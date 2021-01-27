db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { alliance_name: "$name", airline_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {},
          },
        },
        {
          $project: { _id: 1, totalRotas: 1 },
        },
      ],
    },
  },
]);

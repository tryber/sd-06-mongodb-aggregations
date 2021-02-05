db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },

  {
    $lookup: {
      let: { airlines: "$airlines" },
      from: "air_routes",
      pipeline: [
        {
          $match: {
            $and: [
              {
                airplane: {
                  $in: ["747", "380"],
                },
              },
              {
                $expr: {
                  $eq: ["$airline.name", "$$airlines"],
                },
              },
            ],
          },
        },
      ],
      as: "airline_name",
    },
  },
  {
    $addFields: {
      routeSize: {
        $size: "$airline_name",
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: "$routeSize",
      },
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

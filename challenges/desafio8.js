db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { memberAirlines: "$airlines", allianceName: "$name" },
      pipeline: [{
        $match: {
          airplane: {
            $in: ["747", "380"],
          },
          $expr: {
            $or: [
              { $in: ["$airline.name", "$$memberAirlines"] },
              // { $in: ["$airline.iata", "$$memberAirlines"] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$$allianceName",
          totalRotas: { $sum: 1 },
        },
      }],
      as: "alliance",
    },
  },
  {
    $sort: {
      "alliance.totalRotas": -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $unwind: "$alliance",
  },
  {
    $project: {
      _id: "$alliance._id",
      totalRotas: "$alliance.totalRotas",
    },
  },
]);

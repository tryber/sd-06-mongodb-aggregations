db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    as: "routes",
    pipeline: [
      {
        $match: { airplane: { $in: ["747", "380"] } },
      },
      { $group: { _id: "$airline.id", total: { $sum: 1 } } }
    ],
  } },
]);

{ $group: { _id: "$routes", total: { $sum: "$routes.airline" } } },

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    as: "routes",
    let: { name: "$airlines" },
    pipeline: [
      { $match: { airplane: { $in: ["747", "380"] } } },
      
      { $match: {
        $expr: {
          $and: [
            { $eq: [ "$routes.airlines.name",  "$$name" ] }
          ]
        }
      } }
    ],
  } },
])

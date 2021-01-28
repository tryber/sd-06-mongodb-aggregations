db.air_alliances.aggregate([{ $unwind: "$airlines" }, { $lookup: { from: "air_routes", let: { name: "$airlines" }, pipeline: [{ $match: { $expr: { $eq: ["$airline.name", "$$name"] }, airplane: { $in: ["747", "380"] } } }, { $project: { airline: "$airline.name", airplane: 1 } }], as: "airlineRT" } }, { $project: { _id: 0, alianca: "$name", route: "$airlineRT.airplane" } }, { $unwind: "$route" }, { $group: { _id: { name: "$alianca", aviao: "$route" }, total: { $sum: 1 } } }, { $group: { _id: "$_id.name", totalRotas: { $sum: "$total" } } }]);

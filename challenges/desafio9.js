db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $addFields: { birthYear: { $toInt: "$birthYear" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: { _id: 0 } },
]);

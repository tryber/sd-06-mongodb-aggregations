db.tripps.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $addFields: { intYear: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$intYear" },
      menorAnoNascimento: { $min: "$intYear" },
    },
  },
  { $project: { _id: 0 } },
]);

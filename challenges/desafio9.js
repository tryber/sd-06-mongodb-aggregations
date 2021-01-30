db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoINT: { $max: { $toInt: "$birthYear" } },
      menorAnoINT: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maiorAnoINT",
      menorAnoNascimento: "$menorAnoINT",
    },
  },
]);

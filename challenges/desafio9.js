db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $not: { $eq: "" } },
    },
  },
  {
    $group: {
      _id: null,
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 },
  },
]);

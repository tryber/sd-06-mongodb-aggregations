db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
  },
  {
    $group: {
      _id: null,
      mairAnoINT: { $max: { $toInt: "$birthYear" } },
      menorAnoINT: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$mairAnoINT",
      menorAnoNascimento: "$menorAnoINT",
    },
  },
]);

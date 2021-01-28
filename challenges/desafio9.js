db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: 1,
        $ne: "",
      },
    },
  },
  {
    $group: {
      _id: "$birthYear",
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);

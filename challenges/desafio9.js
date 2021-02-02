db.trips.aggregate([
  {
    $match: { birthYear: { $nin: ["", null] } },
  },
  {
    $set: { idades: { $toInt: "$birthYear" } },
  },
  {
    $group: {
      _id: "idades",
      maiorAnoNascimento: { $max: "$idades" },
      menorAnoNascimento: { $min: "$idades" },
    },
  },
  {
    $project: { _id: 0 },
  },
]).pretty();

db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  { $addFields: { intBirthYear: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$intBirthYear" },
      menorAnoNascimento: { $min: "$intBirthYear" },
    },
  },
  {
    $project: {
      _id: false,
    },
  },
]);

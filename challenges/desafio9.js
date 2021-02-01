db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "", $exists: true },
    },
  },
  {
    $addFields: {
      intBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: { $max: "$intBirthYear" },
      menorAnoNascimento: { $min: "$intBirthYear" },
    },
  },
  {
    $project: {
      _id: false,
      maiorAnoNascimento: true,
      menorAnoNascimento: true,
    },
  },
]);

db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $ne: "",
        $exists: true
      },
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
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);

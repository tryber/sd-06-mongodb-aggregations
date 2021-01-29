db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  {
    $addFields: {
      convertedBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
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

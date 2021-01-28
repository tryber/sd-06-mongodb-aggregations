db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $nin: [""] },
    },
  },
  {
    $addFields: {
      convertedBirthday: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedBirthday" },
      menorAnoNascimento: { $min: "$convertedBirthday" },
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

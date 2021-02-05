db.trips.aggregate([
  {
    $match: {
      $and: [
        {
          birthYear: { $ne: "" },
        },
        { birthYear: { $exists: true } },
      ],
    },
  },
  {
    $addFields: {
      convertedYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedYear" },
      menorAnoNascimento: { $min: "$convertedYear" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
  {
    $sort: {
      maiorAnoNascimento: -1,
      menorAnoNascimento: 1,
    },
  },
  {
    $limit: 1,
  },
]);

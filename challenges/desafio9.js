db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $nin: [""] } },
        { birthYear: { $exists: true } },
      ],
    },
  },
  {
    $group: {
      _id: null,
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

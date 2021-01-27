db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: "" } },
      ],
    },
  },
  {
    $addFields: {
      anoNasc: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$anoNasc" },
      menorAnoNascimento: { $min: "$anoNasc" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);

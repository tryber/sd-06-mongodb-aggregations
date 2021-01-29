db.trips.aggregate([
  { $match: {
    $and: [
      { birthYear: { $exists: true } },
      { birthYear: { $ne: "" } },
    ],
  } },
  { $addFields: {
    year: { $toInt: "$birthYear" },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$year" },
    menorAnoNascimento: { $min: "$year" },
  } },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);

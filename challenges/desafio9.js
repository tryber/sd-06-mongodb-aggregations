db.trips.aggregate([
  { $match: {
    $and: [
      { birthYear: { $exists: true } },
      { birthYear: { $ne: "" } },
    ],
  } },
  { $project: { _id: 0, birthYear: { $toInt: "$birthYear" } } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
]);

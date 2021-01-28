db.trips.aggregate([
  { $match: {
    birthYear: { $gte: 1 },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  } },
]);

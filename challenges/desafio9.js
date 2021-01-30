db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: {
    anoNascimento: { $toInt: "$birthYear" },
  } },
  { $group: {
    _id: "null",
    maiorAnoNascimento: { $max: "$anoNascimento" },
    menorAnoNascimento: { $min: "$anoNascimento" },
  } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: "$maiorAnoNascimento",
    menorAnoNascimento: "$menorAnoNascimento",
  } },
]);

db.trips.aggregate([{ $match: { $and:
[{ birthYear: { $exists: true } },
  { $nor: [{ birthYear: "" }] }] } },
{ $group: {
  _id: null,
  maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
  menorAnoNascimento: { $min: { $toInt: "$birthYear" } } } },
{ $project: { _id: 0 } },
]);

// usertype:
db.trips.aggregate([
  {
    $group:
    {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
]);
// tenho que calcular em cima de stopTime e startTime

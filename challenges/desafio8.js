// Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus
// A380 , para descobrir qual delas tem o maior número de rotas com esses aviões.

db.air_routes.aggregate([
  {
    // definindo o filtro principal
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    // https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    // definindo ordem decrescente
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);

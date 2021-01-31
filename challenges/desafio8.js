/*
Trocando de contexto, vamos utilizar nosso outro dataset que contém dados de
empresas aéreas, suas rotas, seus voos e parcerias.

1)Liste todas as parcerias da coleção air_alliances, que voam rotas com um
Boing 747 ou um Airbus A380 , para descobrir
2)qual delas tem o maior número de rotas com esses aviões.

No campo airplane, na coleção air_routes:

Boing 747 está abreviado para 747
Airbus A380 está abreviado para 380
O resultado da sua query deve ter o seguinte formato:

{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }

*/

// airlines é um array, cada airline tem que combinar com algum campo em air_routes
// $unwind para extrair cada airline.  O campo continua sendo "$airlines"
// ...
// tudo o que combinar com $airlines vai trazer dentro de $alliances_routes, um array
// dentro de $alliances_routes verificar quem dá $match com airplane 747 e 380
// $unwind para trazer cada alliances_routes separada pra ver o $match de airplanes
// alliances_routes.airplane
// para contar $sum +1 e agrupar por nome de linha aerea
// trazer quem tem o maior numero de rotas (1 só)

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup:
    {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "alliances_routes",
    },
  },
  { $unwind: "$alliances_routes" },
  { $match: { "alliances_routes.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

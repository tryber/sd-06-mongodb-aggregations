db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "juncao",
    },
  },
  {
    $unwind: "$juncao",
  },
  {
    $match: {
      "juncao.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);

/* Estava muito travada na construção do lookup tentando fazer aquele em que
se usa let e pipeline, mas vi com o PR do Matheus Coutinho que dá pra
fazer de um modo mais simples e que eu estava complicando atoa.
Tentei fazer aparecer o resultado esperado de um outro modo com o $max pra
não ficar com praticamente a mesma solução do Matheus e parecer cópia mas não
consegui. Então ficou com o $sort mesmo.
link do PR: https://github.com/tryber/sd-06-mongodb-aggregations/pull/94/files
 */

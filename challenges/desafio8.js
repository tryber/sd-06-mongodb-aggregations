/* ### Desafio 8
Trocando de contexto, vamos utilizar nosso outro dataset que contém dados de empresas aéreas, suas rotas, 
seus voos e parcerias.

#### Liste todas as parcerias da coleção `air_alliances`, que voam rotas com um Boing 747 ou um 
Airbus A380 , para descobrir qual delas tem o maior número de rotas com esses aviões.

No campo `airplane`, na coleção `air_routes`: 
- Boing 747 está abreviado para `747`
- Airbus A380 está abreviado para `380`

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> } */

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { air: "$airlines" },
      pipeline: [
        {
          $match: {
            $or: [{ airplane: "747" }, { airplane: "380"}],
            $expr: { $eq: ["$airline.name", "$$air"] }
          }
        }
      ],
      as: "nome_da_alianca",
    },
  },
  { $addFields: {
    rotas: { $size: "$nome_da_alianca" }
  }},
  { $group: {
    _id: "$name",
    total_de_rotas: { $sum: "$rotas" },
    }
  },
  { $sort: { totat_de_rotas: -1 } }, 
  { $project: { _id: 1, totalRotas: { $max: ["$total_de_rotas"] } } }, 
  { $limit: 1 },
]);

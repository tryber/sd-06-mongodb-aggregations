/*
Encontre a 1)média de viagens por tipo de usuário.
Exiba 2) o valor em horas com apenas duas casas decimais
Exiba 3) a média de viagens ordenada de forma crescente.

Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:

{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
*/

// agrupar por tipo de usuário ($usertype)
// em cada usuario buscar a duração da viagem em milissegundos e extrair a media ($avg)
// exibir ($project) e ordenar ($sort)
// meu resultado vem negativo ($abs para valor absoluto)
//

db.trips.aggregate([
  {
    $group:
    {
      _id: "$usertype",
      duracaoMedia:
      {
        $avg:
        {
          $divide:
            [
              { $abs: { $subtract: ["$startTime", "$stopTime"] } },
              { $multiply: [60, 60, 1000] },
            ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);

/*
Usando a pipeline anterior que retorna o dia com mais viagens, determine qual
estação tem o maior número de viagens nesse dia da semana.
Exiba apenas o nome da estação e o total de viagens.
Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número
de uma data.

O resultado da sua query deve ter o seguinte formato:

{ "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }
*/

// agrupar por estação(_id: $startStationName) que corresponda ao dia (5)
// somar +1 vez. $sort pta ordenar o maior $limit pra trazer apenas O maior

db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
  },
  },
  { $match: {
    diaDaSemana: 5,
  },
  },
  {
    $group: {
      _id: "$startStationName",
      vezesDiaSemana: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$vezesDiaSemana",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

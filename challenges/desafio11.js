/*
Determine qual o dia da semana com maior número de viagens iniciadas.
Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um
número de uma data.

O resultado da sua query deve ter o seguinte formato:

{ "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }
*/

// https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/index.html
//  { $dayOfWeek: <dateExpression> }
// agrupar por dia da semana (_id: $dayOfWeek) e somar +1 dia
// primeiro ordenar e depoiis limita a 1 (o maior numero de viagens)

db.trips.aggregate([
  {
    $group:
    {
      _id: { $dayOfWeek: "$startTime" },
      somaDia: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$somaDia",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

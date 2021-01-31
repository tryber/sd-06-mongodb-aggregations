/*
A partir da coleção trips, determine
1)o menor e
2)o maior ano de nascimento.
Guarde essa informação, você precisará dela mais tarde.

3)Não considere documentos com valores vazios ("") ou em que o campo não existe!

Para este desafio utilize o operador $toInt para converter de string para valor
inteiro.

O resultado da sua query deve ter o seguinte formato:

{ "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
*/

// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/index.html
// { $toInt: <expression> } || { $convert: { input: <expression>, to: "int" } }

// $match apenas com os documentos que tenham ano de nascimento e que seu valor
// n seja vazio
// agrupar por maior ano e por menor ano, cada documento (_id: null)

db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  {
    $group:
    {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project:
    {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);

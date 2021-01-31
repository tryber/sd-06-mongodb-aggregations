/*
Vamos nos aprofundar um pouco mais em nossa coleção de filmes.

Conte quantos filmes cada um dos atores e atrizes do elenco (cast) já
participou e obter uma média do campo imdb.rating para cada um desses atores e atrizes.
Traga o
1)nome do ator ou atriz,
2)número de filmes em que participou e
3)a média do imdb desses filmes arredondada para uma casa decimal usando o
operador $round.

Considere somente os membros do elenco de filmes com o idioma 4)inglês (English).
Exiba a lista em
5)ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

Sua query deve retornar 47055 documentos.
Cada documento no resultado deve ter o seguinte formato:

{ "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
*/

// cast é um array -$unwind para estabelecer que cada ator tem relação individual
// com um filme e assim reagrupar por ator ($group - _id:"$cast")
// para cada filme soma +1 (conta quantos possuem o mesmo ator)

db.movies.aggregate([
  { $match: { languages: { $all: ["English"] } } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project:
    {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

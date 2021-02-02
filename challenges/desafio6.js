/*
Vamos explorar mais operadores aritméticos!

Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o
1)maior valor,
2)menor valor,
3)média e
4)o desvio padrão das avaliações (campo imdb.rating)

Para a média e o desvio padrão arredonde os valores para uma casa decimal
utilizando o $round.

Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma
sequência de string parecida com essas abaixo, portanto $regex é um operador
bem-vindo:

Won 10 Oscars
Won 1 Oscar

Utilizem o $stdDevSamp para calcular o desvio padrão.

O resultado da sua query deve ter o seguinte formato:

{
  "maior_rating" : <maior_rating>,
  "menor_rating" : <menor_rating>,
  "media_rating" : <media_rating>,
  "desvio_padrao" : <desvio_padrao>
}

*/

// como visto nessa thread: https://trybecourse.slack.com/archives/C016CCMKN9E/p1611857007302900
// regex segurido pelo colega Paulo Volpin <3

// usa Operadores de acumulação $max, $min, $avg

// $stdDevSamp: https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
// { $stdDevSamp: <expression> }

db.movies.aggregate([
  { $match: { awards: { $regex: /Won\s[1-9]\sOscar/ } } },
  {
    $group:
    {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project:
    {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);

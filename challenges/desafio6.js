// Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o maior valor,
// menor valor, média e o desvio padrão das avaliações (campo imdb.rating)
db.movies.aggregate([
  {
    // Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma sequência de
    // string parecida com essas abaixo, portanto $regex é um operador bem-vindo:
    $match: {
      // https://stackoverflow.com/questions/46102472/regular-expression-s0-9-snomination
      awards: { $regex: /Won\s[1-9]\sOscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      // Utilizem o $stdDevSamp para calcular o desvio padrão.
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);

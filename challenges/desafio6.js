db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^Won \d+ oscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media_rating: {
        $avg: "$imdb.rating",
      },
      desvio_padrao: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);

/* não tinha conseguido entender como poderia encontrar os filmes premiados,
explorei o banco e vi o campo awards mas ainda assim não enconrei nenhum campo
com as palavras Won ou algo do tipo. Utilizei o regex que o William usou no PR
dele e ai sim consegui desenvolver minha query
https://github.com/tryber/sd-06-mongodb-aggregations/pull/30/files
*/

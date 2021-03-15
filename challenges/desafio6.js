db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won (?:1(?:[0-9] Oscars| Oscar)|[2-9] Oscars)/ },
    },
  },
  {
    $group: {
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
      _id: null,
    },
  },
  {
    $set: {
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: 1,
      desvio_padrao: 1,
    },
  },
]);

//  Regex pego no pull request da aluna Carla Nakajuni da T5.

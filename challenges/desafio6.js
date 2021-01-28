db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won\s[1-9]\sOscar/i },
      "imdb.rating": { $gt: 0 },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating_unround: { $avg: "$imdb.rating" },
      desvio_padrao_unround: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating_unround", 1] },
      desvio_padrao: { $round: ["$desvio_padrao_unround", 1] },
    },
  },
]);

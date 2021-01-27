db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^won \d oscar/i },
    },
  },
  {
    $group: {
      _id: null,
      maior: { $max: "$imdb.rating" },
      menor: { $min: "$imdb.rating" },
      media: { $avg: "$imdb.rating" },
      desvio: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior", 1] },
      menor_rating: { $round: ["$menor", 1] },
      media_rating: { $round: ["$media", 1] },
      desvio_padrao: { $round: ["$desvio", 1] },
    },
  },
]);

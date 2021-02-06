db.movies.aggregate([
  {
    $match: { awards: { $regex: /Won\s[1-9]\sOscar/ } },
  },
  {
    $set: { maior_rating: "$imdb.rating" },
  },
  {
    $group: {
      _id: "maior_rating",
      maior_rating: { $max: "$maior_rating" },
      menor_rating: { $min: "$maior_rating" },
      media_rating: { $avg: "$maior_rating" },
      desvio_padrao: { $stdDevSamp: "$maior_rating" },
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 2] },
      _id: 0,
    },
  },
]);

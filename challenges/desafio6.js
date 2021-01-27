db.movies.aggregate(
  [
    {
      $match: {
        awards: { $exists: true},
      },
    },
    {
      $project: {
        _id: 0,
        maior_rating: { $max: "$imdb.rating" },
        menor_rating: { $min: "$imdb.rating" },
        media_rating: { $round: [{ $avg: "$imdb.rating" }] },
        desvio_padrao: { $round: [{ $stdDevSamp: "$imdb.rating" }] },
      },
    },
  ],
);

db.movies.aggregate([
  { $match: { languages: { $all: "English" } } },
  {
    $group: {
      _id: "$cast",
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
]);

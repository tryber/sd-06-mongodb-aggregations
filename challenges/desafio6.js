db.movies.aggregate([
  { $match: {
    awards: { $all: [/Won/i, /Oscar/i] },
  } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating_avg: { $avg: "$imdb.rating" },
    desvio_padrao_stdDev: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating_avg", 1] },
    desvio_padrao: { $round: ["$desvio_padrao_stdDev", 1] },
  } },
]);

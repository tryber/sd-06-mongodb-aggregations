db.movies.aggregate([
  { $match: {
    $and: [
      { awards: { $exists: true } },
      { awards: { $regex: /Won [\d\D] Oscar/ } },
    ],
  } },
  { $project: {
    _id: 0,
    rating: "$imdb.rating",
  } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$rating" },
    menor_rating: { $min: "$rating" },
    media_rating: { $avg: "$rating" },
    desvio_padrao: { $stdDevSamp: "$rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_padrao", 1] },
  } },
]);

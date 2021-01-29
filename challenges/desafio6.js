db.movies.aggregate([
  { $addFields: { result: { $regexMatch: { input: "$awards", regex: /Won \d+ Oscars?/ } } } },
  { $match: { result: true } },
  { $group: { _id: "$result", maior_rating: { $max: "$imdb.rating" }, menor_rating: { $min: "$imdb.rating" }, media_rating: { $avg: "$imdb.rating" }, desvio_padrao: { $stdDevSamp: "$imdb.rating" } } },
  { $project: { _id: 0, maior_rating: 1, menor_rating: 1, media_rating: { $round: ["$media_rating", 1] }, desvio_padrao: { $round: ["$desvio_padrao", 1] } } },
]);

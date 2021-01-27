db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $not: { $in: ["Crime", "Horror"] } },
      rated: { $in: ["PG", "G"] },
      languages: { $in: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      título: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: { notaIMDB: -1, título: 1 },
  },
]);

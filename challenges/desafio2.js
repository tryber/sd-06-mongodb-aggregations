db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Horror", "Crime"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliacao: "$rated",
      notaIMDB: "$imbd.rating",
      votosIMDB: "$imbd.votes",
      ano: "$year",
    },
  },
]);

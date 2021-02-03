db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      $and: [
        {
          $or: [{ rated: "PG" }, { rated: "G" }],
        },
        {
          languages: { $all: ["English", "Spanish"] },
        },
      ],
    },
  },
  {
    $sort: { year: -1, imdb: -1, title: 1 },
  },
  {
    $project: {
      _id: false,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);

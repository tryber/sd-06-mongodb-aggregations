db.movies.aggregate(
  [
    {
      $match: {
        "imdb.rating": { $gte: 7 },
        genres: { $nin: ["Crime", "Horror"] },
        rated: { $in: ["PG", "g"] },
        languages: { $all: ["English", "Spanish"] },
      },
    },
  ],
);

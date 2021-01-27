db.movies.aggregate(
  [
    {
      $match: {
        genres: { $nin: ["Crime", "Horror"] },
        rated: { $in: ["PG", "G"] },
        languages: { $all: ["English", "Spanish"] },
      },
    },
  ],
);

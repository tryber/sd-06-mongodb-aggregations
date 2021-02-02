db.movies.aggregate(
  [
    {
      $match: {
        "imdb.rating": { $gte: 7 },
        genres: { $nin: ["Crime", "Horror"] },
        $and: [
          { $or: [{ rated: "PG" }, { rated: "G" }] },
          { languages: { $all: ["English", "Spanish"] } },
        ],
      },
    },
  ],
);

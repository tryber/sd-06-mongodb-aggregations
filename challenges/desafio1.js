db.movies
  .aggregate([
    {
      $match: {
        $and: [
          { "imdb.rating": { $gte: NumberDecimal(7) } },
          { genres: { $ne: ["Crime", "Horror"] } },
          { rated: { $in: ["PG", "G"] } },
          { languages: { $in: ["English", "Spanish"] } },
        ],
      },
    },
  ])
  .pretty();

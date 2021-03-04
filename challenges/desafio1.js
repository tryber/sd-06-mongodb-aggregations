db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $not: { $in: ["Crime", "Horror"] } } },
        { $or: [{ rated: "PG" }, { rated: "G" }] },
        { languages: { $all: ["English", "Spanish"] } },
      ],
    },
  },
  { $limit: 41 },
]);

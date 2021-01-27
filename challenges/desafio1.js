db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { languages: { $all: ["English", "Spanish"] } },
        { $or: [{ rated: { $eq: "PG" } }, { rated: { $eq: "G" } }] },
        { $or: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }] },
      ],
    },
  },
]);

db.movies.aggregate([
  { $match: { $and: [{ "imdb.rating": { $lt: 7 } }, { genres: { $nin: ["Crime", "Horror"] } },
    { $or: [{ rated: "PG" }, { rated: "G" }] }, { languages: { $all: ["English", "Spanish"] } },
  ] },
  },
]).pretty();

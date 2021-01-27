db.movies.aggregate([
  { $match: { $and: [{ "imdb.rating": { $gte: 7 } }, { $and: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }] },
    { $or: [{ rated: "PG" }, { rated: "G" }] }, { languages: { $all: ["English", "Spanish"] } },
  ] },
  },
]).pretty();

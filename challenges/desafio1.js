db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $ne: { $all: ["Crime", "Horror"] } } },
    { $or: [{ rated: "PG" }, { rated: "G" }] },
    { languages: { $all: ["English", "Spanish"] } },
  ]}},
]);

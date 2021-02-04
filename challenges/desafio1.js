db.movies.aggregate([
  { $match: { $and: [{ "imdb.rating": { $gte: 7 } },
    { $and: [{ languages: "English" }, { languages: "Spanish" }] },
    { $or: [{ rated: "PG" }, { rated: "G" }] }, { $nor: [{ genres: "Crime" }, { genres: "Horror" }] }] } },
]);

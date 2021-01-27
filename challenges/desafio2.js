db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { $nor: [{ genres: "Crime" }, { genres: "Horror" }] } },
  { $match: { $or: [{ rated: "PG" }, { rated: "G" }] } },
  { $match: { $and: [{ languages: "English" }, { languages: "Spanish" }] } },
  { $project: { _id: 0, title: 1, rated: 1, "imdb.rating": 1, "imdb.votes": 1, year: 1 } },
  { $project: { title: "titulo", rated: "avaliado", "imdb.rating": "notaIMDB", "imdb.votes": "votosIMDB", year: "ano" } },
]);

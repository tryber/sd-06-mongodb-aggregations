db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { $nor: [{ genres: "Crime" }, { genres: "Horror" }] } },
  { $match: { $or: [{ rated: "PG" }, { rated: "G" }] } },
  { $match: { $and: [{ languages: "English" }, { languages: "Spanish" }] } },
  { $project: { _id: 0, titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year" } },
]);

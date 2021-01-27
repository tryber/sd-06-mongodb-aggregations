db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { $or: [{ rated: { $eq: "PG" } }, { rated: { $eq: "G" } }] } },
  { $match: { languages: { $all: ["Spanish", "English"] } } },
  { $match: { $or: [{ genres: { $ne: "Crime" } }, { genres: { $ne: "Horror" } }] } },
  { $project: {
    titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year",
  } },
]);

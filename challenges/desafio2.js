db.movies.aggregate([
  { $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $not: { $in: ["Crime", "Horror"] } } },
      { rated: { $in: ["PG", "G"] } },
      { languages: { $all: ["English", "Spanish"] } },
    ] } },
  { $limit: 1 },
  { $addFields: {
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
  { $project: { titulo: 1, avaliado: 1, notaIMDB: 1, votosIMDB: 1, ano: 1 } },
]).pretty();

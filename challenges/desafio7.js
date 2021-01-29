db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    avg_rating: { $avg: "$imdb.rating" },
    numeroFilmes: { $sum: 1 },
  } },
  { $project: { _id: 1, numeroFilmes: 1, mediaIMDB: { $round: ["$avg_rating", 1] } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

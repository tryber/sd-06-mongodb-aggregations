db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind:
      "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      somaIDMB: { $sum: "$imdb.rating" },
    },
  },
  {
    $project: { _id: 1, numeroFilmes: 1, mediaIMDB: { $round: [{ $divide: ["$somaIDMB", "$numeroFilmes"] }, 1] } },
  },
  { $sort: { numeroFilmes: -1 } },
]);

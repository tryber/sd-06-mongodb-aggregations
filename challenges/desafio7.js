db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      count: { $sum: 1 },
      avg: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: "$count",
      mediaIMDB: { $round: ["$avg", 1] },
    },
  },
  { $sort: { numeroFilmes: -1 } },
]);

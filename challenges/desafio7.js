db.movies.aggregate([
  {
    $match: { cast: { $exists: true }, languages: { $in: ["English"] } },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: { _id: "$cast", numeroFilmes: { $sum: 1 }, mediaIMDB: { $avg: "$imdb.rating" } },
  },
  {
    $sort: { _id: -1, numeroFilmes: -1 },
  },
  {
    $project: { numeroFilmes: 1, mediaIMDB: { $round: ["$mediaIMDB", 1] } },
  },
]);

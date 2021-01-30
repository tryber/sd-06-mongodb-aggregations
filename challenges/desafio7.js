db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
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
      _id: "$_id",
      numeroFilmes: "$count",
      mediaIMDB: { $round: ["$avg", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

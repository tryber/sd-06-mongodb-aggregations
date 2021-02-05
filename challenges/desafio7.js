db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: { $elemMatch: { $eq: "English" } },
    },
  }, {
    $unwind: "$cast",
  }, {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: { $round: ["$imdb.rating", 1] } },
    },
  }, {
    $project: {
      _id: "$cast",
      numeroFilmes: 1,
      mediaIMDB: 1,
    },
  }, {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);

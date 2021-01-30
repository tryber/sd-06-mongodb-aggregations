db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numFilmes: { $sum: 1 },
    media: { $avg: "$imdb.rating" },
  } },
  { $project: {
    _id: 1,
    numeroFilmes: "$numFilmes",
    mediaIMDB: { $round: ["$media", 1] },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

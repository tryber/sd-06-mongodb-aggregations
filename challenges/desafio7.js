db.movies.aggregate([
  { $match: { language: { $elemMatch: { $eq: "English" } } } },
  { $unwind: "$cast" },
  { $group: { _id: "$cast", numeroFilmes: { $sum: 1 }, mediaIMDB: { $round: { $avg: "$imdb.rating" } } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);

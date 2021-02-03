// cosnt actors = [
//   "Sandra Bullock",
//   "Tom Hanks",
//   "Julia Roberts",
//   "Kevin Spacey",
//   "George Clooney"
// ];

db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: { $eq: "English" },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);

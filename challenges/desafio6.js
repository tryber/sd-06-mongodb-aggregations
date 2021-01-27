db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /won \d oscar/i } },
  },
  {
    $unwind: "$imdb.rating",
  },
  {
    $project: {
      _id: 0,
      rating: "$imdb.rating",
    },
  },
]);

// {
//   $sort: { "imdb.rating": -1 },
// },

// db.movies.find({ awards: { $regex: /won \d oscar/i } }, { _id: 0, title: 1, awards: 1 });

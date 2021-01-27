db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: ["Crime", "Horror"] } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } },
  { $limit: 41 },
]);

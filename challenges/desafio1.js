db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 }, rated: { $in: ["PG", "G"] }, genres: { $nin: ["Crime", "Horror"] }, languages: { $all: ["English", "Spanish"] } } },
]);
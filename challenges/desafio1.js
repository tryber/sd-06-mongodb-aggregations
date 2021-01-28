db.movies.aggregate([
  {
    $match:
    {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Horror", "Crime"] },
      rated: { $in: ["PG", "G", "UNRATED"] },
      $and: [{ languages: { $eq: "English" }, }, { languages: { $eq: "Spanish" }, },]
    },
  },
]);

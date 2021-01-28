db.movies.aggregate([
  {
    $match: 
    {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Horror", "Crime"] },
      rated: { $in: ["PG", "G"] },
      $and: [{ languages: { $eq: "English" } }, { languages: { $eq: "Spanish" } }]
    } 
  },
  {
    $project: 
    {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    } 
  },
]);

const aggregation = [
  {
    $match:
    {
      "imdb.rating": {
        $lt: 7,
      },
      genres: {
        $nin: ["Crime", "Horror"],
      },
      rated: {
        $in: ["PG", "G"],
      },
      languages: {
        $in: ["PG", "G"],
      },

    },
    { 
      $project: {
        titulo: '$title',
        avaliado: '$rated',
        notaIMDB: '$imdb.rating',
        votosIMDB: '$imdb.votes',
        ano: '$year',
        _id:0
            } 
    },
    {
      $sort: { ano:-1 , notaIMDB:-1, titulo:1}
    }
  },
];
db.movies.aggregate(aggregation);
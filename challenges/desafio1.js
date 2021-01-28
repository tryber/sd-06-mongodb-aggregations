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
  },
];
db.movies.aggregate(aggregation);

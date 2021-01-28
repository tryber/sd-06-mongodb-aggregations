const aggregation = [
  {
    $match:
    {
      "imdb.rating": {
        $gte: 7,
      },
      genres: {
        $nin: ["Crime", "Horror"],
      },
      rated: {
        $in: ["PG", "G"],
      },
      languages: {
        $in: ["English", "Spanish"],
      },

    },
  },
];
db.movies.aggregate(aggregation);

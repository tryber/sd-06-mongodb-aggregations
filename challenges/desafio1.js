db
  // Utilize a coleção movies.
  .movies
  .aggregate([
    {
      // imdb.rating deve ser ao menos 7;
      $match: {
        "imdb.rating": {
          $gte: 7,
        },
        // genres não deve conter Crime ou Horror;
        genres: {
          $nin: ["Crime", "Horror"],
        },
        // rated deve ser igual a PG ou G;
        rated: {
          $in: ["PG", "G"],
        },
        // languages contém English e Spanish.
        languages: {
          $all: ["English", "Spanish"],
        },
      },
    },
  ]);

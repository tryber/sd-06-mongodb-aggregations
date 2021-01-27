db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": {
        $not: {
          $in: ["Crime", "Horror"]
        }
      },
      "rated": {
        $in: ["G", "PG"]
      },
      "languages": {
        $all: ["English", "Spanish"]
      }
    }
  },
  {
    $project: {
      "titulo": "$title",
      "avaliado": "$rated",
      "notaIMDB": "$imdb.rating",
      "votosIMDB": "$imdb.votes",
      "ano": "$year",
      _id: 0,
    }
  }
]);

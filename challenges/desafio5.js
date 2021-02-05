db.movies.aggregate([
  {
    $match:
    {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: true } },
      ],
    },
  },
  {
    $addFields: {
      atoresFav: [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            "$atoresFav",
          ],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);

/* Depois de MUITAS horas neste requisito com muitas buscas na internet,
revendo plantão, minhas anotacoes recorri ao slack e o que me salvou a entender
onde estava meu erro foi o PR do William
link: https://github.com/tryber/sd-06-mongodb-aggregations/pull/30/files  */

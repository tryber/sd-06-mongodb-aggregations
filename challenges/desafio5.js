db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $eq: "USA" } },
        { "tomatoes.viewer.rating": { $gte: 3} },
        { cast: { $exists: true } },
      ],
    },        
  },
  {
    $addFields: { favoritos: {
        $setIntersection: [
        [
          "Sandra Bullock",
          "Tom Hanks",
          "Kevin Spacey",
          "George Clooney",
          "Julia Roberts",
        ],
        "$cast"],
    } },
  },
  { $addFields: { num_favs: { $size:  "$favoritos" } } },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);

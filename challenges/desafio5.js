db.movies.aggregate([
  {
    $match: {
      countries: { $eq: "USA" },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: ["Tom Hanks", "George Clooney", "Julia Roberts", "Sandra Bullock", "Kevin Spacey"] },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      intersection: {
        $setIntersection: ["$cast", ["Tom Hanks", "George Clooney", "Julia Roberts", "Sandra Bullock", "Kevin Spacey"]],
      },
    },
  },
  {
    $project: {
      title: 1,
      "tomatoes.viewer.rating": 1,
      intersection: 1,
      num_favs: { $size: "$intersection" },
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
      title: 1,
    },
  },
]);

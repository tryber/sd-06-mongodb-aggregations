db.movies.aggregate([
  {
    $match: {
      countries: {
        $all: ["USA"],
      },
    },
  },
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $match: {
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      favoritesInCommon: {
        $setIntersection: [["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"], "$cast"],
      },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$favoritesInCommon" },
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

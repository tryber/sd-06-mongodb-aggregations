db.movies.aggregate([
  {
    $match:
    {
      awards: {
        $regex: "USA",
      },
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
      cast: { $exists: 1 },
    },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", ["Sandra Bullock", "Julia Roberts",
        "Tom Hanks", "Kevin Spacey", "George Clooney"]] },
      },
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $sort: { "tomatoes.viewer.rating": -1, title: -1 },
  },
]);

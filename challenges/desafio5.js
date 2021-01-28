db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { countries: "USA", "tomatoes.viewer.rating": { $gte: 3 } },
          { $or:
            [
              { cast: "Sandra Bullock" },
              { cast: "Tom Hanks" },
              { cast: "Julia Roberts" },
              { cast: "Kevin Spacey" },
              { cast: "George Clooney" },
            ],
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        cast: 1,
        "tomatoes.viewer.rating": 1,
        actorsFavorites: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        cast: 1,
        "tomatoes.viewer.rating": 1,
        num_favs: {
          $size: { $setIntersection: ["$cast", "$actorsFavorites"] },
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
    { $project: { _id: 0, title: 1 },
    },
  ],
);

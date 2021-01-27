db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: true } },
      ],
    },
  },
  {
    $addFields: {
      array_favs: {
        $setIntersection: [
          ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          "$cast",
        ],
      },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$array_favs" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viwer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);

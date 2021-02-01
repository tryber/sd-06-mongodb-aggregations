db.movies.aggregate([
  { $match: {
    countries: { $all: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: {
      $exists: 1,
    },
  } },
  { $project: {
    num_favs: {
      $size: {
        $setIntersection: [["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"], "$cast"],
      },
    },
    title: 1,
    _id: 0,
    "tomatoes.viewer.rating": 1,
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,

  } },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: 1,

    },
  },
]);

db.movies.aggregate([
  { $unwind: "$cast" },
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
    },
  },
  {
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      cast: { $push: "$cast" },
      tomatoes: { $first: "$tomatoes" },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$cast" },
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
      _id: false,
      title: true,
    },
  },
]);

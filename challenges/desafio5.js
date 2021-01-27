db.movies.aggregate(
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    } },
  { $project: { _id: 0, match_favs: { $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]] }, title: 1, "tomatoes.viewer.rating": 1 } },
  { $addFields: { num_favs: { $size: "$match_favs" } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1 } },
);

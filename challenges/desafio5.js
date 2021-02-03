db.movies.aggregate([
  { $match: { countries: "USA" } },
  { $match: { "tomatoes.viewer.rating": { $gte: 3 } } },
  { $unwind: "$cast" },
  { $match: { $or: [
    { cast: "Sandra Bullock" },
    { cast: "Tom Hanks" },
    { cast: "Julia Roberts" },
    { cast: "Kevin Spacey" },
    { cast: "George Clooney" }] },
  },
  { $group: { _id: "$title", num_favs: { $sum: 1 }, rating: { $sum: "$tomatoes.viewer.rating" } } },
  { $sort: { num_favs: -1, rating: -1, _id: -1 } },
  { $project: { title: "$_id", _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);

db.movies.aggregate([
  { $sort: { title: 1 } },
  { $project: { title_split: { $split: ["$title", " "] }, _id: 0 } },
  { $match: { title_split: { $size: 1 } } },
]);

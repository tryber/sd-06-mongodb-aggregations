db.movies.aggregate([
  { $project: { _id: 0, title_split: { $split: ["$title", " "] } } },
  { title_split: { $size: 1 } },
]);

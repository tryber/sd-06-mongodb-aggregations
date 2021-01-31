db.movies.aggregate([
  { result_split: { $split: ["$title", " "] } },
  { $match: { result_split: { $size: 1 } } },
  { $sort: { result_split: 1 } },
  { $project: {
    _id: false,
    result_split: true,
  } },
]);

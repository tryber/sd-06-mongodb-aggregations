db.movies.aggregate([
  { $sort: { title: 1 } },
  { result_split: { $split: ["$title", " "] } },
  { $match: { result_split: { $size: 1 } } },
  { $project: {
    _id: false,
    result_split: true,
  } },
]);

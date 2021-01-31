db.movies.aggregate([
  { $sort: { title: 1 } },
  { $addFields: { title_split: { $split: ["$title", " "] } } },
  { $match: { title_split: { $size: 1 } } },
  { $project: {
    _id: false,
    title_split: true,
  } },
]);

db.movies.aggregate([
  {
    $project: {
      title_split: { $split: ["$title", " "] },
      title: 1,
    },
  },
  {
    $project: {
      title_size: { $size: "$title_split" },
      title_split: 1,
      title: 1,
    },
  },
  {
    $match: {
      title_size: 1,
    },
  },
  { $sort: { title: 1 } },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);

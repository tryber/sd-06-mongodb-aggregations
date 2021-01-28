db.movies.aggregate([
  {
    $project: {
      title_split: { $split: ["$title", " "] },
      _id: 0,
      title: 1,
    },
  },
  {
    $project: {
      title_split: 1,
      title: 1,
      title_size: { $size: "$title_split" },
    },
  },
  {
    $match: {
      title_size: 1,
    },
  },
  {
    $sort: {
      title: 1,
    },
  },
  {
    $project: {
      title_split: 1,
    },
  },
]);

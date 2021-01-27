db.movies.aggregate([
  {
    $project: {
      title_split: { $split: ["$title", " "] },
      _id: 0,
    },
  },
  {
    $project: {
      title_split: 1,
      title_size: { $size: "$title_split" },
    },
  },
]);

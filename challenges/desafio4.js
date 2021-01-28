db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: { title: 1 },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);

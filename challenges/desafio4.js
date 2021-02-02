db.movies.aggregate([
  { $sort: { title: 1 } },
  {
    $project: {
      title_split: {
        $split: ["$title", " "],
      },
      title: 1,
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);

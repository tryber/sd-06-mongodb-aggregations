db.movies.aggregate([
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
  { $sort: { title: 1 } },
]);

db.movies.aggregate([
  {
    $addFields: {
      // { $split: [ <string expression>, <delimiter> ] }
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      // { $size: <expression> }
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);

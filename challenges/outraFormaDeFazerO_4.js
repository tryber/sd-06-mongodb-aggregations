db.movies.aggregate([
  {
    $match: {
      title: { $not: { $regex: / / } },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: "$title",
    },
  },
  { $sort: { title_split: 1 } },
]).pretty();

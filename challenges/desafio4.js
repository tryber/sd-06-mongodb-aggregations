db.movies.aggregate([
  {
    $project: {
      title_split: {
        $split: ["$title", " "],
      },
      title: 1,
      _id: 0,

    },
  },

  {
    $project: {
      title_split: 1,
      title_size: { $size: "$title_split" },
      title: 1,

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

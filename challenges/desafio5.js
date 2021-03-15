db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viwer.rating": { $gte: 3 },
      cast: {
        $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          ],
        },
      },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viwer.rating": -1, title: -1 },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);

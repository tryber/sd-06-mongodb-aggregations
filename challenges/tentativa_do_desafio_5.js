db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      lista_favs: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
          "$cast",
        ],
      },
    },
  },
  {
    $unwind: {
      path: "$lista_favs",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: { id: "$_id", title: "$title", rating: "$tomatoes.viewer.rating" },
      num_favs: { $sum: 1 },
    },
  },
  { $sort: { "_id.num_favs": -1, "_id.rating": -1, "_id.title": -1 } },
  {
    $project: {
      _id: 0,
      title: "$_id.title",
    },
  },
  { $skip: 24 },
  { $limit: 1 },
]).pretty();
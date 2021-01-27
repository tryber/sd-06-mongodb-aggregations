const favAct = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      counties: "Estados Unidos",
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $addFields: {
      "num_favs": {
        $size: { $setIntersection: [ "$cast", favAct] },
      },
    },
  },
  {
    $sort: {
      "num_favs": -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
]);

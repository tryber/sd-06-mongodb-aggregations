const atoresFavoritos = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      cast: { $in: atoresFavoritos },
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  // $setIntersection => Takes two or more arrays and returns an array that contains
  // the elements that appear in every input array.
  // { $size: <expression> }
  // colocar dentro do $size { $setIntersection: [ <array1>, <array2>, ... ] }
  { $addFields: { num_favs: { $size:
    { $setIntersection:
      [atoresFavoritos, "$cast"] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 },
  },
  { $skip: 24 }, { $limit: 1 },
]);

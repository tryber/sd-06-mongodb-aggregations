// const atoresFavoritos = [
//   "Sandra Bullock",
//   "Tom Hanks",
//   "Julia Roberts",
//   "Kevin Spacey",
//   "George Clooney",
// ];

db.movies.aggregate([
  {
    $match: {
      // preciso dar um jeito de por este trem numa constante.
      cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
    // Takes two or more arrays and returns an array that contains
    // the elements that appear in every input array.
    // { $setIntersection: [ <array1>, <array2>, ... ] }
    // $addFields: { num_favs: { $size: { $setIntersection: [atoresFavoritos, "$cast"] } } }
  },
]);

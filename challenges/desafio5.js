// db.movies.aggregate([
//   {
//     $match: {
//       countries: { $all: ["USA"] },
//       "tomatoes.viewer.rating": { $gte: 3 },
//     },
//   },
//   {
//     $project: {
//       favs: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
//       num_favs: { $setIntersection: ["$cast", "$favs"] },
//       title: 1,
//     },
//   },
// ]);

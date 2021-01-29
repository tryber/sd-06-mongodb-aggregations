db.trips.aggregate([
  {
    $project: {
      hora: { $hour: new Date("2016-01-01T00:50:00Z") },
    },
  },
]);
// {
//   $project: {
//     _id: 0,
//   },
// },

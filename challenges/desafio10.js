db.trips.aggregate([
  {
    $project: {
      media_viagem: { $subtract: ["startTime", "stopTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$media_viagem" },
    },
  },
]);

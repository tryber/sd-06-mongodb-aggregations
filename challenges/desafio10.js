db.trips.aggregate([
  {
    $project: {
      usertype: 1,
      media_viagem: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$media_viagem" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

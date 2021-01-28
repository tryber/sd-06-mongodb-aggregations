db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          3600000, /* milisseg (1000) * seg(60) * min(60) */
        ],
      },
    },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      millisecondsDuration: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $addFields: {
      convertHours: 3600000,
    },
  },
  {
    $addFields: {
      duracaoMedia: {
        $divide: ["$millisecondsDuration", "$convertHours"],
      },
    },
  },
  {
    $project: {
      duracaoMedia: 1,
      convertHours: 1,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);

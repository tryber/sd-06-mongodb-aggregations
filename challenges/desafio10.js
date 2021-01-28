db.trips.aggregate([
  {
    $addFields: {
      dif: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 60, 1000] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: "$dif" },
    },
  },
  {
    $sort: {
      media: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$media", 2],
      },
    },
  },
]);

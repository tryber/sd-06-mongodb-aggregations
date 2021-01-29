db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $round: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] }, 2],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avgTripTime: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTripTime", 2] },
    },
  },
]);

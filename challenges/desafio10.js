db.trips.aggregate([
  // {
  //   $match: {
  //     $and: [
  //       {$_id: { $exists: true, $ne: "" }},
  //       {$usertype: { $exists: true, $ne: "" }},
  //       {$startTime: { $exists: true, $ne: "" }},
  //       {$stopTime: { $exists: true, $ne: "" }},
  //     ]
  //   },
  // },
  {
    $group: {
      _id: "$usertype",
      avgTime: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60],
        },
      },
    },
  },
  { $sort: { avgTime: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTime", 2] },
    },
  },
]);

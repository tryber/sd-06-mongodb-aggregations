db.trips.aggregate([
  {
    $addFields: {
      dif: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 1000] },
        ],
      },
      date: {
        $dateToParts: {
          date: "$startTime",
        },
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracao: { $avg: "$dif" },
    },
  },
  {
    $sort: {
      duracao: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracao",
      },
    },
  },
]);

db.trips.aggregate([
  {
    $project: {
      _id: "$usertype",
      usertype: 1,
      tempo_viagem: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$tempo_viagem" },

    },
  },
  {
    $project: {
      tipo: "$_id",
      _id: 0,
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },

]);

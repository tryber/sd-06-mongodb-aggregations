db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016-03-10"), $lt: new Date("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      MediaTempoMilisegundos: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: { $divide: ["$MediaTempoMilisegundos", 1000 * 60] },
      },
    },
  },
]);

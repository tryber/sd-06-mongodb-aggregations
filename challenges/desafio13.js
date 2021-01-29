db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10") },
      stopTime: { $lt: ISODate("2016-03-11") },
    },
  },
  {
    $addFields: {
      tripTime: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);

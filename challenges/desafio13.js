db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      tripTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: null,
      avgTripTime: { $avg: "$tripTime" },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$avgTripTime", 60000] } },
    },
  },
]);

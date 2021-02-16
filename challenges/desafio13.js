db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {
            $dateToString: { format: "%Y-%m-%d", date: "$startTime" },
          },
          "2016-03-10",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);

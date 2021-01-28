db.trips.aggregate([
  {
    $addFields: {
      dif: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 1000] },
        ]
      },
      date: {
        $dateToParts: {
          date: "$startTime",
        },
      }
    },
  },
  {
    $match: {
      "date.year": 2016,
      "date.month": 3,
      "date.day": 10,
    },
  },
  {
    $group: {
      _id: null,
      duracao: { $avg: "$dif" },
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracao",
      },
    },
  },
]);

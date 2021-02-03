db.trips.aggregate([
  { $match:
    { $expr: {
      $eq: [
        { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } }, "2016-03-10",
      ],
    } },
  },
  { $project: {
    duracaoEmMinutos: { $abs: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
    } },
  } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);

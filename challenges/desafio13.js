db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfMonth: "$startTime" },
      month: { $month: "$startTime" },
      year: { $year: "$startTime" },
    },
  },
  {
    $match: {
      day: 10,
      month: 3,
      year: 2016,
    },
  },
  {
    $project: {
      duracaoEmMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]).pretty();

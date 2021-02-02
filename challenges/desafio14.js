db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMinutos: { $divide: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000] }, 60] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracaoEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
]).pretty();

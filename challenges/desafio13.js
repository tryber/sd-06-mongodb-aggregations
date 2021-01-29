db.trips.aggregate([
  { $match: {
    startTime: {
      $gte: ISODate("2016-03-10T00:00:00"),
      $lte: ISODate("2016-03-10T23:59:59"),
    },
  } },
  { $addFields: {
    diferencaTempo: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $group: {
    _id: null,
    media: { $avg: "$diferencaTempo" },
  } },
  { $addFields: {
    conversao: { $divide: ["$media", 60000] },
  } },
  { $project: {
    _id: 0,
    duuracaoMediaEmMinutos: { $ceil: "$conversao" },
  } },
]);

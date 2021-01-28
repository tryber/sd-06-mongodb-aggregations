db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10T00:00"), $lt: ISODate("2016-03-11T00:00") },
  } },
  { $addFields: {
    duracaoMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
  } },
  { $group: {
    _id: null,
    duracaoMedia: { $avg: "$duracaoMinutos" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: ["$duracaoMedia"] } } },
]);

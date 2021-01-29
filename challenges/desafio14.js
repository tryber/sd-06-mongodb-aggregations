db.trips.aggregate([
  { $match:
    { startTime:
      { $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-11T00:00:00Z") } } },
  { $addFields: { duracao:
          { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  { $group: { _id: 0, media: { $avg: "$duracao" } } },
  { $project: { _id: null, bikeId: "$_id", duracaoMedia: { $ceil: ["$duracaoMedia"] } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 }]);

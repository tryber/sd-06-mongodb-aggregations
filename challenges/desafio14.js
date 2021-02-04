db.trips.aggregate([{ $match: {
  startTime: { $gte: ISODate("2016-03-10") } } },
{ $group:
 { _id: "$bikeid",
   duracaoMedia: {
     $avg: {
       $subtract: ["$stopTime", "$startTime"] } },
 },
},
{ $project: {
  _id: 0,
  bikeId: "$_id",
  duracaoMedia: {
    $ceil: {
      $divide: ["$duracaoMedia", 60000] } } },
},
{ $sort: { duracaoMedia: -1 } },
{ $limit: 5 },
]);

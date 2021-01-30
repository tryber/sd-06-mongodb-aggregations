db.trips.aggregate([
  {
    $project: {
      media_viagem: { $subtract: ["startTime", "stopTime"] },
    }
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$media_viagem" },
    }
  }
]);

// Encontre a média de viagens por tipo de usuário. 

// - Exiba o valor em horas com apenas duas casas decimais 
// - Exiba a média de viagens ordenada de forma crescente. 



// O resultado da sua query deve ter o seguinte formato:

// ```javascript
// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// // ...

// "_id" : ObjectId("572bb8222b288919b68abf5a"),
// "bikeid" : 17827,
// "usertype" : "Subscriber",
// "gender" : 1,
// "birthYear" : 1969,
// "endStationId" : 498,
// "endStationLocation" : {
//         "type" : "Point",
//         "coordinates" : [
//                 -73.98808416,
//                 40.74854862
//         ]
// },
// "endStationName" : "Broadway & W 32 St",
// "startStationId" : 476,
// "startStationLocation" : {
//         "type" : "Point",
//         "coordinates" : [
//                 -73.97966069,
//                 40.74394314
//         ]
// },
// "startStationName" : "E 31 St & 3 Ave",
// "startTime" : ISODate("2016-01-01T00:00:45Z"),
// "stopTime" : ISODate("2016-01-01T00:07:04Z")
// }
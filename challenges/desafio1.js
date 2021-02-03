db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);

// referencias
// para desenvolver o projeto eu contei com a ajuda de Paulo Lins e Andersson Iarrocheski
// https://docs.mongodb.com/manual/tutorial/model-monetary-data/
// https://stackoverflow.com/questions/8218484/mongodb-inserts-float-when-trying-to-insert-integer
// https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/
// https://docs.mongodb.com/manual/reference/operator/update/currentDate/
// https://docs.mongodb.com/manual/reference/operator/query/regex/#regex-case-insensitive
// https://www.youtube.com/playlist?list=PLYxzS__5yYQmr3HQQJMPBMbKtMY37sdsv
// db.produtos.updateMany(
//   { valorUnitario: { $exists: false } },
//   { $set: { valorUnitario: NumberDecimal("0.00") } },
// );
